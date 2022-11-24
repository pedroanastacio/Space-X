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

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [launches, setLaunches] = useState<Launch[]>([])
  const [fetchingLaunches, setFetchingLaunches] = useState(true)
  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  )
  const [totalPages, setTotalPages] = useState(0)

  const { width } = useWindowSize()

  const isSmallScreen = width <= 800

  function paginate({ selected }: { selected: number }) {
    setCurrentPage(selected + 1)
  }

  useEffect(() => {
    const prevPage = searchParams.get('page')
    searchParams.set('page', String(currentPage ?? prevPage ?? 1))
    setSearchParams(searchParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

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

            <Paginate
              totalPages={totalPages}
              currentPage={currentPage}
              paginate={paginate}
            />
          </>
        )}
      </LaunchesRecords>
    </HomeContainer>
  )
}
