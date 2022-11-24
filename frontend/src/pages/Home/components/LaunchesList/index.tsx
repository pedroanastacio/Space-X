import { YoutubeLogo, VideoCameraSlash } from 'phosphor-react'
import { Badge } from '../../../../components/Badge'
import { Loader } from '../../../../components/Loader'
import { Launch } from '../../../../interfaces/Launch'

import { LaunchesListContainer, LaunchesListItem } from './styles'

interface LaunchesListProps {
  launches: Launch[]
  loading: boolean
}

export function LaunchesList({ launches, loading }: LaunchesListProps) {
  const hasLaunches = launches.length > 0

  return (
    <LaunchesListContainer>
      <ul>
        {launches.map((launch, index) => (
          <LaunchesListItem key={launch._id} index={index}>
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
          </LaunchesListItem>
        ))}
      </ul>

      {loading && <Loader showLayer={hasLaunches} />}
    </LaunchesListContainer>
  )
}
