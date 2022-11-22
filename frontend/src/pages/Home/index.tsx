import { SearchBar } from './components/SearchBar'
import { RocketsAndColorsContextProvider } from '../../context/RocketsAndColorsContext'
import { BarChart } from './components/BarChart'
import { PieChart } from './components/PieChart'
import { ScoreCard } from './components/Scorecard'

import {
  HomeContainer,
  Stats,
  LaunchesRecords,
  LaunchesTable,
  LaunchesTableRow,
} from './styles'

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

        <LaunchesTable>
          <table>
            <thead>
              <tr>
                <th>N° Voo</th>
                <th>Logo</th>
                <th>Missão</th>
                <th>Data de lançamento</th>
                <th>Foguete</th>
                <th>Resultado</th>
                <th>Vídeo</th>
              </tr>
            </thead>

            <tbody>
              {[...Array(5)].map((launch, index) => (
                <LaunchesTableRow key={index} index={index}>
                  <td>180</td>
                  <td>
                    <img src="/src/assets/rocket.svg" alt="Rocket" />
                  </td>
                  <td>Starlink 4-27 (v1.5)</td>
                  <td>05/10/2022</td>
                  <td>Used Falcon 9</td>
                  <td>
                    <span>Sucesso</span>
                  </td>
                  <td>
                    <a href="#">
                      <img src="/src/assets/rocket.svg" alt="Rocket" />
                    </a>
                  </td>
                </LaunchesTableRow>
              ))}
            </tbody>
          </table>

          <div>
            <p>PAgiantion</p>
          </div>
        </LaunchesTable>
      </LaunchesRecords>
    </HomeContainer>
  )
}
