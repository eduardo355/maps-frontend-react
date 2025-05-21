import { useContext, type ChangeEvent } from 'react'
import { LocationContext } from '../application'

export const SearchBar = () => {
  const {
    map,
    places,
    userLocation,
    searchPlacesByTerm,
    getRouteBetweenPoints,
  } = useContext(LocationContext)

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    searchPlacesByTerm(e.target.value)
  }

  const onClick = (coords: number[]) => {
    if (!userLocation) return

    const [lng, lat] = coords
    map?.flyTo({
      center: [lng, lat],
    })

    getRouteBetweenPoints(userLocation, [lng, lat])
  }

  return (
    <div className="fixed top-6 left-6 z-50 bg-white w-64 p-0.5 rounded">
      <input
        type="text"
        className="w-full px-4 py-2 focus:outline-none border-b"
        placeholder="Ingresa una direccion..."
        onChange={onChangeQuery}
      />
      <div>
        <ul>
          {places?.map((place) => (
            <li
              key={place.id}
              className="hover:bg-gray-100 px-4 py-2 w-full cursor-pointer flex flex-col"
              onClick={() => onClick(place.geometry.coordinates)}
            >
              <span>{place.properties.name_preferred}</span>
              <small>{place.properties.full_address}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
