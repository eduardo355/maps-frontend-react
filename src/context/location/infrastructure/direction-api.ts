import axios from 'axios'

const directionApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'full',
    steps: false,
    language: 'es',
    access_token: import.meta.env.VITE_ACCESS_TOKEN,
  },
})

export default directionApi
