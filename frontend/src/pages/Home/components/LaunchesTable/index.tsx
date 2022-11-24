import { useEffect, useState } from 'react'
import { YoutubeLogo, VideoCameraSlash, RocketLaunch } from 'phosphor-react'
import { useSearchParams } from 'react-router-dom'
import { Launch } from '../../../../interfaces/Launch'
import { api } from '../../../../lib/axios'

import {
  Badge,
  EmptyMessage,
  LaunchesList,
  LaunchesTableContainer,
  LaunchesTableRow,
  LaunchListItem,
} from './styles'
import { useWindowSize } from '../../../../hooks/useWindowSize'

export function LaunchesTable() {
  const [launches, setLaunches] = useState<Launch[]>([])
  const [launchesFetched, setlaunchesFetched] = useState(false)

  const [searchParams] = useSearchParams()

  const { width } = useWindowSize()

  const isSmallScreen = width <= 800

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

      setlaunchesFetched(true)
    }

    fetchLaunches()
  }, [searchParams])

  if (launches.length === 0 && launchesFetched) {
    return (
      <EmptyMessage>
        <RocketLaunch size={32} weight="fill" />
        <span>Nenhum lançamento encontrado</span>
      </EmptyMessage>
    )
  }

  return (
    <LaunchesTableContainer>
      {isSmallScreen ? (
        <LaunchesList>
          {launches.map((launch, index) => (
            <LaunchListItem key={launch._id} index={index}>
              <div>
                <img
                  src={launch.patch ?? '/src/assets/rocket.svg'}
                  alt="Rocket"
                />

                <span>{launch.flight_number}</span>
              </div>

              <div>
                <span>{launch.name}</span>

                <span>{launch.date}</span>
              </div>

              <div>
                {launch.webcast ? (
                  <a href={launch.webcast} target="_blank" rel="noreferrer">
                    <YoutubeLogo size={32} weight="fill" />
                  </a>
                ) : (
                  <VideoCameraSlash size={25} weight="fill" />
                )}

                <span>
                  <Badge type={launch.result}>{launch.result}</Badge>
                </span>
              </div>
            </LaunchListItem>
          ))}
        </LaunchesList>
      ) : (
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
            {launches.map((launch, index) => (
              <LaunchesTableRow key={launch._id} index={index}>
                <td>{launch.flight_number}</td>
                <td>
                  <img
                    src={launch.patch ?? '/src/assets/rocket.svg'}
                    alt="Rocket"
                  />
                </td>
                <td>{launch.name}</td>
                <td>{launch.date}</td>
                <td>{launch.rocket.name}</td>
                <td>
                  <Badge type={launch.result}>{launch.result}</Badge>
                </td>
                <td>
                  {launch.webcast ? (
                    <a href={launch.webcast} target="_blank" rel="noreferrer">
                      <YoutubeLogo size={32} weight="fill" />
                    </a>
                  ) : (
                    <VideoCameraSlash size={25} weight="fill" />
                  )}
                </td>
              </LaunchesTableRow>
            ))}
          </tbody>
        </table>
      )}

      <div>
        <p>Pagination</p>
      </div>
    </LaunchesTableContainer>
  )
}
