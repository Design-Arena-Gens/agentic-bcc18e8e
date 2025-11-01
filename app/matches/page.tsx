"use client"

import { useEffect, useMemo, useState } from 'react'
import { loadProfile } from '@/lib/storage'
import { SAMPLE_PLAYERS } from '@/lib/sampleData'
import { computeMatchScore, filterPlayers, type ScoredPlayer } from '@/lib/matching'
import type { Profile } from '@/lib/types'

export default function MatchesPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(20)
  const [minRating, setMinRating] = useState<number>(1)
  const [maxRating, setMaxRating] = useState<number>(6)

  useEffect(() => {
    const p = loadProfile()
    setProfile(p)
    if (p?.location.radiusKm) setMaxDistanceKm(p.location.radiusKm)
  }, [])

  const results: ScoredPlayer[] = useMemo(() => {
    return filterPlayers({
      players: SAMPLE_PLAYERS,
      profile,
      minRating,
      maxRating,
      maxDistanceKm
    }).map((player) => ({
      player,
      score: computeMatchScore({ player, profile })
    })).sort((a, b) => b.score - a.score)
  }, [profile, minRating, maxRating, maxDistanceKm])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold">Find Partners</h1>
          <p className="text-white/70 text-sm">Showing nearby players ranked by compatibility.</p>
        </div>
        <div className="ml-auto flex flex-wrap gap-6">
          <div>
            <label className="block text-sm mb-1">Max Distance (km)</label>
            <input type="range" min={5} max={50} step={5} value={maxDistanceKm} onChange={(e) => setMaxDistanceKm(parseInt(e.target.value))} />
            <div className="text-sm text-white/80 mt-1">{maxDistanceKm} km</div>
          </div>
          <div className="grid grid-cols-2 gap-3 items-end">
            <div>
              <label className="block text-sm mb-1">Min Rating</label>
              <input type="number" min={1} max={6} step={0.5} value={minRating} onChange={(e) => setMinRating(parseFloat(e.target.value))} className="w-24 rounded-md bg-white/5 border-white/10" />
            </div>
            <div>
              <label className="block text-sm mb-1">Max Rating</label>
              <input type="number" min={1} max={6} step={0.5} value={maxRating} onChange={(e) => setMaxRating(parseFloat(e.target.value))} className="w-24 rounded-md bg-white/5 border-white/10" />
            </div>
          </div>
        </div>
      </div>

      {!profile && (
        <div className="card">
          <p className="text-white/80">Set up your <a className="underline" href="/profile">profile</a> to improve matches. We'll still show sample players meanwhile.</p>
        </div>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map(({ player, score }) => (
          <li key={player.id} className="card">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tennis-yellow/20 text-tennis-yellow font-bold">{Math.round(score)}</div>
              <div className="space-y-1">
                <div className="font-semibold text-lg">{player.name} <span className="text-white/60 text-sm">({player.city})</span></div>
                <div className="text-sm text-white/80">NTRP {player.rating.toFixed(1)} ? {player.playStyles.join(', ')}</div>
                <div className="text-sm text-white/70">Prefers: {player.preferredTimes.join(', ')} ? Days: {player.preferredDays.join(', ')}</div>
                {player.contact && <a href={`mailto:${player.contact}`} className="text-sm underline">Contact</a>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
