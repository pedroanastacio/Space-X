import { PuffLoader } from 'react-spinners'

import { LoaderContainer } from './styles'

interface LoaderProps {
  showLayer?: boolean
}

export function Loader({ showLayer = true }: LoaderProps) {
  return (
    <LoaderContainer showLayer={showLayer}>
      <div>
        <PuffLoader color="#db7004" />
      </div>
    </LoaderContainer>
  )
}
