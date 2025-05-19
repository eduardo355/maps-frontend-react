import { type Map } from 'mapbox-gl'

export interface LocationState {
  map?: Map
  isLoading: boolean
  isMapReady: boolean
  userLocation?: [number, number]
}
