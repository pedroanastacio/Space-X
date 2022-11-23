import { SearchBar } from './components/SearchBar'
import { RocketsAndColorsContextProvider } from '../../context/RocketsAndColorsContext'
import { BarChart } from './components/BarChart'
import { PieChart } from './components/PieChart'
import { ScoreCard } from './components/Scorecard'
import { LaunchesTable } from './components/LaunchesTable'

import { HomeContainer, Stats, LaunchesRecords } from './styles'

export function Home() {
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

        <LaunchesTable />
      </LaunchesRecords>
    </HomeContainer>
  )
}
