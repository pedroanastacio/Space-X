import { useContext, useEffect, useState } from 'react'
import {
  BarChart as RBarChart,
  ResponsiveContainer,
  Tooltip,
  Bar,
  XAxis,
  YAxis,
} from 'recharts'
import { RocketsAndColorsContext } from '../../../../context/RocketsAndColorsContext'
import { api } from '../../../../lib/axios'

interface LaunchesPerYearItem {
  year: number
  [key: string]: number
}

interface LaunchesPerYear extends Array<LaunchesPerYearItem> {}

export function BarChart() {
  const [launchesPerYear, setLaunchesPerYear] = useState<LaunchesPerYear[]>([])

  const { rocketsAndColors } = useContext(RocketsAndColorsContext)

  useEffect(() => {
    async function fetchLaunchesPerYearStats() {
      const response = await api.get('/launches/stats-per-year')
      setLaunchesPerYear(response.data.results)
    }

    fetchLaunchesPerYearStats()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RBarChart data={launchesPerYear}>
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
