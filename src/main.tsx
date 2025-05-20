import mapboxgl from 'mapbox-gl'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
