import { haversineDistanceKm } from './geo'
import type { Player, Profile } from './types'

export interface FilterInput {
  players: Player[]
  profile: Profile | null
  minRating: number
  maxRating: number
  maxDistanceKm: number
}

export interface ScoredPlayer { player: Player; score: number }

export function filterPlayers({ players, profile, minRating, maxRating, maxDistanceKm }: FilterInput): Player[] {
  return players.filter((p) => {
    if (p.rating < minRating || p.rating > maxRating) return false

    if (profile?.location.latitude != null && profile?.location.longitude != null) {
      const userPoint = { lat: profile.location.latitude, lon: profile.location.longitude }
      const playerPoint = { lat: p.latitude, lon: p.longitude }
      const d = haversineDistanceKm(userPoint, playerPoint)
      if (d > maxDistanceKm) return false
    }

    return true
  })
}

export function computeMatchScore({ player, profile }: { player: Player; profile: Profile | null }): number {
  // Base score
  let score = 50

  // Skill difference (smaller is better)
  const ratingDiff = profile ? Math.abs(player.rating - profile.rating) : 1.0
  score += Math.max(0, 20 - ratingDiff * 10) // up to +20

  // Distance factor
  if (profile?.location.latitude != null && profile?.location.longitude != null) {
    const d = haversineDistanceKm(
      { lat: profile.location.latitude, lon: profile.location.longitude },
      { lat: player.latitude, lon: player.longitude }
    )
    const radius = profile.location.radiusKm || 20
    const distanceBoost = Math.max(0, 15 - (d / radius) * 15) // closer within radius gets more
    score += distanceBoost
  }

  // Availability overlap
  if (profile) {
    const dayOverlap = intersectionSize(new Set(profile.preferredDays), new Set(player.preferredDays))
    const timeOverlap = intersectionSize(new Set(profile.preferredTimes), new Set(player.preferredTimes))
    score += Math.min(10, dayOverlap * 2 + timeOverlap * 3)

    // Play style overlap
    const styleOverlap = intersectionSize(new Set(profile.playStyles), new Set(player.playStyles))
    score += Math.min(10, styleOverlap * 4)
  }

  // Clamp 0..100
  return Math.max(0, Math.min(100, Math.round(score)))
}

function intersectionSize<T>(a: Set<T>, b: Set<T>): number {
  let n = 0
  for (const v of a) if (b.has(v)) n++
  return n
}
