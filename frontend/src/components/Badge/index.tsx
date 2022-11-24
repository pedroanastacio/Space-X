import { BadgeContainer } from './styles'

interface BadgeProps {
  type: 'SUCESSO' | 'FALHA' | 'INDETERMINADO'
  children: string
}

export function Badge({ type, children }: BadgeProps) {
  return <BadgeContainer type={type}>{children}</BadgeContainer>
}
