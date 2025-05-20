import { Map, Marker, Popup } from 'mapbox-gl'
import { useEffect, useReducer, type ReactElement } from 'react'
import { LocationContext, locationReducer } from '../application'
import type { LocationState, PlacesResponse } from '../domain/location'
import { getLocation } from '../infrastructure/location-api'
import searchApi from '../infrastructure/search-api'

const INITIAL_STATE: LocationState = {
  userLocation: undefined,
  isMapReady: false,
  places: undefined,
  isLoading: true,
  map: undefined,
  markers: [],
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

  const searchPlacesByTerm = async (query: string) => {
    if (query.length === 0) {
      dispatch({ type: 'setPlaces', payload: [] })
    }

    if (!state.userLocation) throw new Error('No hay ubicacion del usuario.')

    const resp = await searchApi.get<PlacesResponse>('/forward', {
      params: {
        q: query,
        proximity: state.userLocation.join(','),
      },
    })

    dispatch({ type: 'setPlaces', payload: resp.data.features })
  }

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove())
    const newMarkers: Marker[] = []
    if (state.places && state.places?.length > 0)
      for (const place of state.places) {
        const [lng, lat] = place.geometry.coordinates

        const popup = new Popup()

        const newMarker = new Marker()
          .setPopup(popup)
          .setLngLat([lng, lat])
          .addTo(state.map!)

        newMarkers.push(newMarker)
      }

    dispatch({ type: 'setMarkers', payload: newMarkers })
  }, [state.places, state.map])

  return (
    <LocationContext.Provider value={{ ...state, setMap, searchPlacesByTerm }}>
      {children}
    </LocationContext.Provider>
  )
}
