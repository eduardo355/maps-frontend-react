import type { Map } from 'mapbox-gl'
import { createContext } from 'react'

interface LocationContextProps {
  isLoading: boolean
  isMapReady: boolean
  setMap: (map: Map) => void
  userLocation?: [number, number]
}

export const LocationContext = createContext({} as LocationContextProps)
