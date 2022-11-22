import { createContext, PropsWithChildren, useCallback, useState } from 'react'

const COLORS = ['#ea736e', '#00c49f', '#559ae6', '#fdbe49']

interface RocketsAndColorsItem {
  rocket: string
  color: string
}

interface RocketsAndColorsContextType {
  rocketsAndColors: RocketsAndColorsItem[]
  setColorsToRockets: (rockets: string[]) => void
}

export const RocketsAndColorsContext = createContext(
  {} as RocketsAndColorsContextType,
)

export function RocketsAndColorsContextProvider({
  children,
}: PropsWithChildren) {
  const [rocketsAndColors, setRocketsAndColors] = useState<
    RocketsAndColorsItem[]
  >([])

  const setColorsToRockets = useCallback((rockets: string[]) => {
    const rocketsAndColors = rockets.map((rocket: string, index: number) => {
      return {
        rocket,
        color: COLORS[index % COLORS.length],
      }
    })

    setRocketsAndColors(rocketsAndColors)
  }, [])

  return (
    <RocketsAndColorsContext.Provider
      value={{ rocketsAndColors, setColorsToRockets }}
    >
      {children}
    </RocketsAndColorsContext.Provider>
  )
}
