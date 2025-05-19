import { createContext } from 'react'

interface LocationContextProps {
  isLoading: boolean
  userLocation?: [number, number]
}

export const LocationContext = createContext({} as LocationContextProps)
