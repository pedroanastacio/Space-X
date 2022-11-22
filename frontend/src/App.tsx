import { ThemeProvider } from 'styled-components'
import { DefaultLayout } from './layouts/default'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <DefaultLayout />

      <GlobalStyle />
    </ThemeProvider>
  )
}
