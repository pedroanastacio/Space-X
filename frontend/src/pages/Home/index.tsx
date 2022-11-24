import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RocketLaunch } from 'phosphor-react'
import { SearchBar } from './components/SearchBar'
import { BarChart } from './components/BarChart'
import { PieChart } from './components/PieChart'
import { ScoreCard } from './components/Scorecard'
import { LaunchesTable } from './components/LaunchesTable'
import { LaunchesList } from './components/LaunchesList'
import { Paginate } from '../../components/Paginate'
import { Launch } from '../../interfaces/Launch'
import { useWindowSize } from '../../hooks/useWindowSize'
import { api } from '../../lib/axios'

import {
  HomeContainer,
  Stats,
  LaunchesRecords,
  EmptyMessage,
  LoaderContainer,
} from './styles'
import { RocketsAndColorsContext } from '../../context/RocketsAndColorsContext'
import { Loader } from '../../components/Loader'

interface LaunchesPerRocket {
  rocket: string
  count: number
}

interface LaunchesPerYear {
  year: number
  [key: string]: number
}

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [launchesPerRocket, setLaunchesPerRocket] = useState<
    LaunchesPerRocket[]
  >([])
  const [launchesPerYear, setLaunchesPerYear] = useState<LaunchesPerYear[]>([])
  const [launches, setLaunches] = useState<Launch[]>([])
  const [fetchingLaunches, setFetchingLaunches] = useState(true)
  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  )
  const [totalPages, setTotalPages] = useState(0)

  const { rocketsAndColors, setColorsToRockets } = useContext(
    RocketsAndColorsContext,
  )

  const { width } = useWindowSize()

  const hasLaunches = launches.length > 0
  const hasRocketsAndColors = rocketsAndColors.length > 0

  const isSmallScreen = width <= 800

  function paginate({ selected }: { selected: number }) {
    setCurrentPage(selected + 1)
  }

  useEffect(() => {
    async function fetchLaunchesPerRocket() {
      const response = await api.get('/launches/stats-per-rocket')
      setLaunchesPerRocket(response.data.results)
    }

    fetchLaunchesPerRocket()
  }, [])

  useEffect(() => {
    const rockets = [
      ...new Set(
        launchesPerRocket.map((item: LaunchesPerRocket) => item.rocket),
      ),
    ]

    setColorsToRockets(rockets)
  }, [launchesPerRocket, setColorsToRockets])

  useEffect(() => {
    async function fetchLaunchesPerYearStats() {
      const response = await api.get('/launches/stats-per-year')
      setLaunchesPerYear(response.data.results)
    }

    fetchLaunchesPerYearStats()
  }, [])

  useEffect(() => {
    const prevPage = searchParams.get('page')
    searchParams.set('page', String(currentPage ?? prevPage ?? 1))
    setSearchParams(searchParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  useEffect(() => {
    async function fetchLaunches() {
      setFetchingLaunches(true)

      const response = await api.get('/launches', {
        params: searchParams,
      })

      setLaunches(
        response.data.results.map((launch: Launch) => {
          return {
            ...launch,
            date: new Date(launch.date).toLocaleDateString(),
          }
        }),
      )

      setCurrentPage(response.data.page)
      setTotalPages(response.data.totalPages)

      setFetchingLaunches(false)
    }

    fetchLaunches()
  }, [searchParams])

  return (
    <HomeContainer>
      <h1>
        <img src="/src/assets/rocket.svg" alt="Rocket" />
        Space X
      </h1>

      {hasRocketsAndColors ? (
        <Stats>
          <div>
            <h3>Lançamentos de foguetes</h3>

            <PieChart data={launchesPerRocket} />

            <ScoreCard />
          </div>

          <div>
            <h3>Lançamentos por ano</h3>

            <BarChart data={launchesPerYear} />
          </div>
        </Stats>
      ) : (
        <LoaderContainer>
          <Loader showLayer={false} />
        </LoaderContainer>
      )}
      <LaunchesRecords>
        <h2>Registros de lançamentos</h2>

        <SearchBar />

        {!hasLaunches && !fetchingLaunches ? (
          <EmptyMessage>
            <RocketLaunch size={32} weight="fill" />
            <span>Nenhum lançamento encontrado</span>
          </EmptyMessage>
        ) : (
          <>
            {isSmallScreen ? (
              <LaunchesList launches={launches} loading={fetchingLaunches} />
            ) : (
              <LaunchesTable launches={launches} loading={fetchingLaunches} />
            )}

            {hasLaunches && (
              <Paginate
                totalPages={totalPages}
                currentPage={currentPage}
                paginate={paginate}
              />
            )}
          </>
        )}
      </LaunchesRecords>
    </HomeContainer>
  )
}
