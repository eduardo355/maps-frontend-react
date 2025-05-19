import { LocationProvider } from '../context/location/ui/location-provider'
import { MapView } from '../context/location/ui/map-view'

export default function HomePage() {
  return (
    <main className="h-screen w-screen">
      <LocationProvider>
        <MapView />
      </LocationProvider>
    </main>
  )
}
