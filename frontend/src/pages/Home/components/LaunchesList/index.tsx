import { YoutubeLogo, VideoCameraSlash } from 'phosphor-react'
import { Badge } from '../../../../components/Badge'
import { Launch } from '../../../../interfaces/Launch'

import { LaunchesListContainer, LaunchesListItem } from './styles'

interface LaunchesListProps {
  launches: Launch[]
}

export function LaunchesList({ launches }: LaunchesListProps) {
  return (
    <LaunchesListContainer>
      {launches.map((launch, index) => (
        <LaunchesListItem key={launch._id} index={index}>
          <div>
            <img src={launch.patch ?? '/src/assets/rocket.svg'} alt="Rocket" />

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
    </LaunchesListContainer>
  )
}
