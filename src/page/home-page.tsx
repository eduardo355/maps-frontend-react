import { LocationProvider } from '../context/location/ui/location-provider'

export default function HomePage() {
  return (
    <main className="h-screen w-screen">
      <LocationProvider>
        <h1>page</h1>
      </LocationProvider>
    </main>
  )
}
