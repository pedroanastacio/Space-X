import { useContext } from 'react'
import {
  PieChart as RPieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { RocketsAndColorsContext } from '../../../../context/RocketsAndColorsContext'
import { useWindowSize } from '../../../../hooks/useWindowSize'

interface LaunchesPerRocket {
  rocket: string
  count: number
}

interface PieChartProps {
  data: {
    rocket: string
    count: number
  }[]
}

export function PieChart({ data }: PieChartProps) {
  const { rocketsAndColors } = useContext(RocketsAndColorsContext)

  const { width } = useWindowSize()
  const isSmallScreen = width <= 450

  return (
    <ResponsiveContainer width="100%" height="100%" maxHeight={200}>
      <RPieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="rocket"
          label
          labelLine={false}
          outerRadius={80}
          fill="#C4C4CC"
        >
          {data.map((item: LaunchesPerRocket, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                rocketsAndColors.find(
                  (element) => element.rocket === item.rocket,
                )?.color
              }
            />
          ))}
        </Pie>
        <Legend
          layout={isSmallScreen ? 'horizontal' : 'vertical'}
          verticalAlign={isSmallScreen ? 'bottom' : 'middle'}
          align="left"
          wrapperStyle={{ fontSize: '0.875rem' }}
        />
      </RPieChart>
    </ResponsiveContainer>
  )
}
