export interface DirectionsResponse {
  routes: Route[]
  waypoints: Waypoint[]
  code: string
  uuid: string
}

export interface Route {
  weight_name: string
  weight: number
  duration: number
  distance: number
  legs: Leg[]
  geometry: Geometry
}

export interface Geometry {
  coordinates: Array<number[]>
  type: Type
}

export type Type = 'LineString'

export interface Leg {
  notifications: Notification[]
  via_waypoints: []
  admins: Admin[]
  weight: number
  duration: number
  steps: Step[]
  distance: number
  summary: string
}

export interface Admin {
  iso_3166_1_alpha3: string
  iso_3166_1: string
}

export interface Notification {
  details: Details
  subtype: string
  type: string
  geometry_index_end: number
  geometry_index_start: number
}

export interface Details {
  actual_value: string
  message: string
}

export interface Step {
  intersections: Intersection[]
  maneuver: Maneuver
  name: string
  duration: number
  distance: number
  driving_side: DrivingSide
  weight: number
  mode: Mode
  geometry: Geometry
  ref?: string
  destinations?: string
  exits?: string
}

export type DrivingSide =
  | 'left'
  | 'right'
  | 'slight left'
  | 'slight right'
  | 'straight'

export interface Intersection {
  bearings: number[]
  entry: boolean[]
  mapbox_streets_v8?: MapboxStreetsV8
  is_urban?: boolean
  admin_index: number
  out?: number
  geometry_index: number
  location: number[]
  in?: number
  duration?: number
  turn_weight?: number
  turn_duration?: number
  weight?: number
  traffic_signal?: boolean
  lanes?: Lane[]
  classes?: ClassElement[]
  stop_sign?: boolean
  toll_collection?: TollCollection
  tunnel_name?: string
}

export type ClassElement = 'motorway' | 'toll' | 'tunnel'

export interface Lane {
  indications: DrivingSide[]
  valid_indication?: DrivingSide
  valid: boolean
  active: boolean
  access?: Access
}

export interface Access {
  designated: string[]
}

export interface MapboxStreetsV8 {
  class: MapboxStreetsV8Class
}

export const MapboxStreetsV8Class = {
  Motorway: 'motorway',
  MotorwayLink: 'motorway_link',
  Primary: 'primary',
  PrimaryLink: 'primary_link',
  Secondary: 'secondary',
  SecondaryLink: 'secondary_link',
  Service: 'service',
  Tertiary: 'tertiary',
  Trunk: 'trunk',
  TrunkLink: 'trunk_link',
} as const

export type MapboxStreetsV8Class =
  (typeof MapboxStreetsV8Class)[keyof typeof MapboxStreetsV8Class]

export interface TollCollection {
  type: string
}

export interface Maneuver {
  type: string
  instruction: string
  bearing_after: number
  bearing_before: number
  location: number[]
  modifier?: DrivingSide
}

export const Mode = {
  Driving: 'driving',
} as const

export type Mode = (typeof Mode)[keyof typeof Mode]

export interface Waypoint {
  distance: number
  name: string
  location: number[]
}
