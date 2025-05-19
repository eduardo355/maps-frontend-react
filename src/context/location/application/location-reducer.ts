import type { LocationState } from '../ui/location-provider'

type LocationActions = { type: 'setUserLocation'; payload: [number, number] }

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
    default:
      return state
  }
}
