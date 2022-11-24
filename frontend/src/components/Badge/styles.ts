/* eslint-disable no-unused-vars */
import styled from 'styled-components'

enum BadgeColor {
  SUCESSO = 'green-500',
  FALHA = 'red-500',
  INDETERMINADO = 'gray-800',
}

interface BadgeProps {
  type: 'SUCESSO' | 'FALHA' | 'INDETERMINADO'
}

export const BadgeContainer = styled.span<BadgeProps>`
  background: ${(props) => props.theme[BadgeColor[props.type]]};
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: ${(props) => props.theme.white};
  font-size: 0.8rem;
  font-weight: 600;
`
