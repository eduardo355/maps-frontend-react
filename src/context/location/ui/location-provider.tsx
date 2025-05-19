import { useEffect, useReducer, type ReactElement } from 'react'
import { LocationContext } from '../application/location-context'
import { locationReducer } from '../application/location-reducer'
import { getLocation } from '../infrastructure/location-api'

export interface LocationState {
  isLoading: boolean
  userLocation?: [number, number]
}

const INITIAL_STATE: LocationState = {
  isLoading: true,
  userLocation: undefined,
}

interface Props {
  children: ReactElement | ReactElement[]
}

export const LocationProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(locationReducer, INITIAL_STATE)

  useEffect(() => {
    getLocation().then((lngLat) =>
      dispatch({ type: 'setUserLocation', payload: lngLat })
    )
  }, [])

  return (
    <LocationContext.Provider value={{ ...state }}>
      {children}
    </LocationContext.Provider>
  )
}
