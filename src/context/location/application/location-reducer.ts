import type { Map } from 'mapbox-gl'
import type { LocationState } from '../domain/location'

type LocationActions =
  | { type: 'setMap'; payload: Map }
  | { type: 'setUserLocation'; payload: [number, number] }

export const locationReducer = (
  state: LocationState,
  action: LocationActions
): LocationState => {
  switch (action.type) {
    case 'setUserLocation':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      }
    case 'setMap':
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      }
    default:
      return state
  }
}
