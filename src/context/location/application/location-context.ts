import type { Map } from 'mapbox-gl'
import { createContext } from 'react'
import type { Feature } from '../domain/location'

interface LocationContextProps {
  searchPlacesByTerm: (query: string) => void
  userLocation?: [number, number]
  setMap: (map: Map) => void
  isMapReady: boolean
  isLoading: boolean
  places?: Feature[]
  map?: Map
  getRouteBetweenPoints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>
}

export const LocationContext = createContext({} as LocationContextProps)
