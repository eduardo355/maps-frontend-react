import mapboxgl from 'mapbox-gl'
import { useContext, useLayoutEffect, useRef } from 'react'
import { LocationContext } from '../application/location-context'
import { LocationButton } from './location-button'
import { SearchBar } from './search-bar'

export const MapView = () => {
  const mapDiv = useRef<HTMLDivElement>(null)
  const { setMap, isLoading, userLocation, isMapReady } =
    useContext(LocationContext)

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/dark-v10',
        container: mapDiv.current!,
        center: userLocation,
        zoom: 15,
      })
      setMap(map)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, userLocation])

  return (
    <div ref={mapDiv} className="w-full h-full">
      {isMapReady && (
        <>
          <SearchBar />
          <LocationButton />
        </>
      )}
    </div>
  )
}
