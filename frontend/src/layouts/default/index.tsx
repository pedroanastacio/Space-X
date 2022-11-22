import { Home } from '../../pages/Home'
import { Footer } from '../../components/Footer'

import { DefaultLayoutContainer } from './styles'

export function DefaultLayout() {
  return (
    <DefaultLayoutContainer>
      <Home />

      <Footer />
    </DefaultLayoutContainer>
  )
}
