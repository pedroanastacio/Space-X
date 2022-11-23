import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/Footer'

import { DefaultLayoutContainer } from './styles'

export function DefaultLayout() {
  return (
    <DefaultLayoutContainer>
      <Outlet />

      <Footer />
    </DefaultLayoutContainer>
  )
}
