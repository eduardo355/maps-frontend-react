import { useContext, useLayoutEffect, useRef } from 'react'
import { LocationContext } from '../application/location-context'
import mapboxgl from 'mapbox-gl'

export const MapView = () => {
  const mapDiv = useRef<HTMLDivElement>(null)
  const { setMap, isLoading, userLocation } = useContext(LocationContext)

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new mapboxgl.Map({
        container: mapDiv.current!,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: userLocation,
        zoom: 15,
      })
      setMap(map)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, userLocation])

  return <div ref={mapDiv} className="w-full h-full"></div>
}
