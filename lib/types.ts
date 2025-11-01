export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening'
export type PlayStyle = 'Singles' | 'Doubles' | 'Casual Rally' | 'Competitive Match'
export type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

export interface GeoLocation {
  city: string
  latitude: number | null
  longitude: number | null
  radiusKm: number
}

export interface Profile {
  name: string
  email: string
  rating: number
  playStyles: PlayStyle[]
  preferredTimes: TimeOfDay[]
  preferredDays: Day[]
  location: GeoLocation
}

export interface Player {
  id: string
  name: string
  rating: number
  playStyles: PlayStyle[]
  preferredTimes: TimeOfDay[]
  preferredDays: Day[]
  city: string
  latitude: number
  longitude: number
  contact?: string
}
