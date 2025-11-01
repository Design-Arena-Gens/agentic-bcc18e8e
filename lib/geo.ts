export function haversineDistanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 6371 // Earth radius in km
  const dLat = deg2rad(b.lat - a.lat)
  const dLon = deg2rad(b.lon - a.lon)
  const lat1 = deg2rad(a.lat)
  const lat2 = deg2rad(b.lat)

  const sinDLat = Math.sin(dLat / 2)
  const sinDLon = Math.sin(dLon / 2)

  const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
  return R * c
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}
