import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RocketLaunch } from 'phosphor-react'
import { SearchBar } from './components/SearchBar'
import { RocketsAndColorsContextProvider } from '../../context/RocketsAndColorsContext'
import { BarChart } from './components/BarChart'
import { PieChart } from './components/PieChart'
import { ScoreCard } from './components/Scorecard'
import { LaunchesTable } from './components/LaunchesTable'
import { LaunchesList } from './components/LaunchesList'
import { Paginate } from '../../components/Paginate'
import { Launch } from '../../interfaces/Launch'
import { useWindowSize } from '../../hooks/useWindowSize'
import { api } from '../../lib/axios'

import { HomeContainer, Stats, LaunchesRecords, EmptyMessage } from './styles'

interface PaginateParams {
  currentPage: number
  totalDocs: number
  docsPerPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export function Home() {
  const [launches, setLaunches] = useState<Launch[]>([])
  const [paginateParams, setPaginateParams] = useState<PaginateParams>(
    {} as PaginateParams,
  )
  const [fetchingLaunches, setFetchingLaunches] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()

  const { width } = useWindowSize()

  const isSmallScreen = width <= 800

  function paginate({ selected }: { selected: number }) {
    setPaginateParams((state) => ({ ...state, currentPage: selected + 1 }))
  }

  useEffect(() => {
    searchParams.set('page', String(paginateParams.currentPage ?? 1))
    setSearchParams(searchParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginateParams])

  useEffect(() => {
    async function fetchLaunches() {
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

      const limit = Number(searchParams.get('limit'))
      const docsPerPage = isNaN(limit) ? 5 : limit > 0 ? limit : 5

      setPaginateParams({
        currentPage: response.data.page,
        totalDocs: response.data.totalDocs,
        docsPerPage,
        totalPages: response.data.totalPages,
        hasNext: response.data.hasNext,
        hasPrev: response.data.hasPrev,
      })

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

      <RocketsAndColorsContextProvider>
        <Stats>
          <div>
            <h3>Lançamentos de foguetes</h3>

            <PieChart />

            <ScoreCard />
          </div>

          <div>
            <h3>Lançamentos por ano</h3>

            <BarChart />
          </div>
        </Stats>
      </RocketsAndColorsContextProvider>

      <LaunchesRecords>
        <h2>Registros de lançamentos</h2>

        <SearchBar />

        {launches.length === 0 && !fetchingLaunches ? (
          <EmptyMessage>
            <RocketLaunch size={32} weight="fill" />
            <span>Nenhum lançamento encontrado</span>
          </EmptyMessage>
        ) : (
          <>
            {isSmallScreen ? (
              <LaunchesList launches={launches} />
            ) : (
              <LaunchesTable launches={launches} />
            )}

            <Paginate params={paginateParams} paginate={paginate} />
          </>
        )}
      </LaunchesRecords>
    </HomeContainer>
  )
}
