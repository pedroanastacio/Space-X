import { useEffect, useState } from 'react'
import { api } from '../../../../lib/axios'

import { ResultCount, ScorecardContainer } from './styles'

interface LaunchesPerResultItem {
  result: string
  count: number
}

export function ScoreCard() {
  const [launchesPerResult, setLaunchesPerResult] = useState<
    LaunchesPerResultItem[]
  >([])

  useEffect(() => {
    async function fetchLaunchesPerResult() {
      const response = await api.get('/launches/stats-per-result')
      setLaunchesPerResult(response.data.results)
    }

    fetchLaunchesPerResult()
  }, [])

  return (
    <ScorecardContainer>
      <strong>Resultado de lançamento:</strong>

      <ResultCount type="SUCESSO">
        Sucesso:{' '}
        <strong>
          {launchesPerResult.find((item) => item.result === 'SUCESSO')?.count}
        </strong>
      </ResultCount>

      <ResultCount type="FALHA">
        Falha:{' '}
        <strong>
          {launchesPerResult.find((item) => item.result === 'FALHA')?.count}
        </strong>
      </ResultCount>

      <ResultCount type="INDETERMINADO">
        Indeterminado:{' '}
        <strong>
          {
            launchesPerResult.find((item) => item.result === 'INDETERMINADO')
              ?.count
          }
        </strong>
      </ResultCount>
    </ScorecardContainer>
  )
}
