/* eslint-disable no-unused-vars */
import styled from 'styled-components'

export const ScorecardContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 1rem;

  > strong {
    color: ${(props) => props.theme['gray-300']};
    font-size: 0.875rem;
  }
`
enum ResultColor {
  SUCESSO = 'green-500',
  FALHA = 'red-500',
  INDETERMINADO = 'gray-100',
}

interface ResultCountProps {
  type: 'SUCESSO' | 'FALHA' | 'INDETERMINADO'
}

export const ResultCount = styled.span<ResultCountProps>`
  color: ${(props) => props.theme['gray-400']};
  font-size: 0.875rem;

  strong {
    color: ${(props) => props.theme[ResultColor[props.type]]};
  }
`
