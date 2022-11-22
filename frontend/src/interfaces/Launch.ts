import { Rocket } from './Rocket'

export interface Launch {
  _id: string
  name: string
  flight_number: number
  patch: string
  date: string
  rocket: Rocket
  result: 'SUCESSO' | 'FALHA' | 'INDETERMINADO'
  webcast: string
}
