import { useContext, useEffect, useState } from 'react'
import {
  PieChart as RPieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { RocketsAndColorsContext } from '../../../../context/RocketsAndColorsContext'
import { api } from '../../../../lib/axios'

interface LaunchesPerRocketItem {
  rocket: string
  count: number
}

export function PieChart() {
  const [launchesPerRocket, setLaunchesPerRocket] = useState<
    LaunchesPerRocketItem[]
  >([])

  const { rocketsAndColors, setColorsToRockets } = useContext(
    RocketsAndColorsContext,
  )

  useEffect(() => {
    async function fetchLaunchesPerRocket() {
      const response = await api.get('/launches/stats-per-rocket')
      setLaunchesPerRocket(response.data.results)
    }

    fetchLaunchesPerRocket()
  }, [])

  useEffect(() => {
    const rockets = [
      ...new Set(
        launchesPerRocket.map((item: LaunchesPerRocketItem) => item.rocket),
      ),
    ]

    setColorsToRockets(rockets)
  }, [launchesPerRocket, setColorsToRockets])

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RPieChart>
        <Pie
          data={launchesPerRocket}
          dataKey="count"
          nameKey="rocket"
          label
          labelLine={false}
          outerRadius={80}
          fill="#C4C4CC"
        >
          {launchesPerRocket.map((item: LaunchesPerRocketItem, index) => (
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
          layout="vertical"
          verticalAlign="middle"
          align="left"
          wrapperStyle={{ fontSize: '0.875rem' }}
        />
      </RPieChart>
    </ResponsiveContainer>
  )
}
