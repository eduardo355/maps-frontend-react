import { LngLatBounds, Map, Marker, Popup, type AnySourceData } from 'mapbox-gl'
import { useEffect, useReducer, type ReactElement } from 'react'
import { LocationContext, locationReducer } from '../application'
import type { DirectionsResponse } from '../domain/direction'
import type { LocationState, PlacesResponse } from '../domain/location'
import directionApi from '../infrastructure/direction-api'
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

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionApi.get<DirectionsResponse>(
      `/mapbox/driving/${start.join(',')};${end.join(',')}`
    )

    const { geometry } = resp.data.routes[0]
    const { coordinates } = geometry
    // let kms = distance / 1000
    // kms = Math.round(kms * 100)
    // kms /= 100

    // const minutes = Math.floor(duration / 60)

    const bounds = new LngLatBounds(start, start)

    for (const coordinate of coordinates) {
      const newCordinate: [number, number] = [coordinate[0], coordinate[1]]
      bounds.extend(newCordinate)
    }

    state.map?.fitBounds(bounds, { padding: 100 })

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coordinates,
            },
          },
        ],
      },
    }

    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString')
      state.map.removeSource('RouteString')
    }

    state.map?.addSource('RouteString', sourceData)
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 3,
      },
    })
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
    <LocationContext.Provider
      value={{ ...state, setMap, searchPlacesByTerm, getRouteBetweenPoints }}
    >
      {children}
    </LocationContext.Provider>
  )
}
