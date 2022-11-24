import { useContext } from 'react'
import {
  BarChart as RBarChart,
  ResponsiveContainer,
  Tooltip,
  Bar,
  XAxis,
  YAxis,
} from 'recharts'
import { RocketsAndColorsContext } from '../../../../context/RocketsAndColorsContext'

interface BarChartProps {
  data: {
    year: number
    [key: string]: number
  }[]
}

export function BarChart({ data }: BarChartProps) {
  const { rocketsAndColors } = useContext(RocketsAndColorsContext)

  return (
    <ResponsiveContainer width="100%" height="80%" minHeight={280}>
      <RBarChart data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        {rocketsAndColors.map((item) => (
          <Bar
            key={item.rocket}
            dataKey={item.rocket}
            stackId="a"
            fill={item.color}
          />
        ))}
      </RBarChart>
    </ResponsiveContainer>
  )
}
