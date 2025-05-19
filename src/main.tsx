import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1IjoiY291Y2gzNTUiLCJhIjoiY21hcTFuNmFrMDVoZzJ1cTQ5Mm03dDh3diJ9.wu8nHyOe1oWdeNggfsZ4yQ'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
