import type { Map, Marker } from 'mapbox-gl'
import type { Feature, LocationState } from '../domain/location'

type LocationActions =
  | { type: 'setMap'; payload: Map }
  | { type: 'setUserLocation'; payload: [number, number] }
  | { type: 'setPlaces'; payload: Feature[] }
  | { type: 'setMarkers'; payload: Marker[] }

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
    case 'setPlaces':
      return {
        ...state,
        places: action.payload,
      }
    case 'setMarkers':
      return {
        ...state,
        markers: action.payload,
      }
    default:
      return state
  }
}
