import { Map, Marker, Popup } from 'mapbox-gl'
import type { LocationState } from '../domain/location'
import { getLocation } from '../infrastructure/location-api'
import { useEffect, useReducer, type ReactElement } from 'react'
import { LocationContext, locationReducer } from '../application'

const INITIAL_STATE: LocationState = {
  map: undefined,
  isLoading: true,
  isMapReady: false,
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

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup()
    new Marker().setLngLat(map.getCenter()).setPopup(myLocationPopup).addTo(map)
    dispatch({ type: 'setMap', payload: map })
  }

  return (
    <LocationContext.Provider value={{ ...state, setMap }}>
      {children}
    </LocationContext.Provider>
  )
}
