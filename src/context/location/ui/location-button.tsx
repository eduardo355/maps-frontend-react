import { useContext } from 'react'
import { LocationContext } from '../application'

export const LocationButton = () => {
  const { userLocation, map } = useContext(LocationContext)

  const handleClick = () => {
    map?.flyTo({
      zoom: 14,
      center: userLocation,
    })
  }

  return (
    <button
      onClick={handleClick}
      title="Volver a mi ubicación"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-white shadow-lg p-3 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 12m-9 0a9 9 0 1118 0 9 9 0 01-18 0zm0 0l6-6m0 0l6 6m-6-6v12"
        />
      </svg>
      <span className="text-sm font-medium text-blue-600">Mi ubicación</span>
    </button>
  )
}
