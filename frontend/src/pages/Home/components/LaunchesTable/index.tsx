import { YoutubeLogo, VideoCameraSlash } from 'phosphor-react'
import { Badge } from '../../../../components/Badge'
import { Loader } from '../../../../components/Loader'
import { Launch } from '../../../../interfaces/Launch'

import { LaunchesTableContainer, LaunchesTableRow } from './styles'

interface LaunchesTableProps {
  launches: Launch[]
  loading: boolean
}

export function LaunchesTable({ launches, loading }: LaunchesTableProps) {
  return (
    <LaunchesTableContainer>
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

      {loading && <Loader />}
    </LaunchesTableContainer>
  )
}
