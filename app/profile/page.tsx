"use client"

import { useEffect, useState } from 'react'
import { loadProfile, saveProfile } from '@/lib/storage'
import type { Profile } from '@/lib/types'

const defaultProfile: Profile = {
  name: '',
  email: '',
  rating: 3.0,
  playStyles: ['Singles', 'Casual Rally'],
  preferredDays: ['Sat', 'Sun'],
  preferredTimes: ['Morning'],
  location: {
    city: '',
    latitude: null,
    longitude: null,
    radiusKm: 15
  }
}

const timeOptions = ['Morning', 'Afternoon', 'Evening'] as const
const styleOptions = ['Singles', 'Doubles', 'Casual Rally', 'Competitive Match'] as const
const dayOptions = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(defaultProfile)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const existing = loadProfile()
    if (existing) setProfile(existing)
    // Try geolocation once on mount if no coords stored
    if (!existing?.location.latitude || !existing?.location.longitude) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setProfile((p) => ({
            ...p,
            location: {
              ...p.location,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }))
        })
      }
    }
  }, [])

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((p) => ({ ...p, [key]: value }))
  }

  function toggleFromArray<K extends 'playStyles' | 'preferredTimes' | 'preferredDays'>(field: K, value: Profile[K][number]) {
    setProfile((p) => {
      const current = [...(p[field] as unknown as string[])]
      const val = value as unknown as string
      const has = current.includes(val)
      const next = has ? current.filter(v => v !== val) : [...current, val]
      return { ...p, [field]: next } as Profile
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    saveProfile(profile)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input value={profile.name} onChange={(e) => update('name', e.target.value)} className="w-full rounded-md bg-white/5 border-white/10" placeholder="Serena Williams" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" value={profile.email} onChange={(e) => update('email', e.target.value)} className="w-full rounded-md bg-white/5 border-white/10" placeholder="you@example.com" required />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm mb-1">NTRP Rating</label>
            <input type="range" min={1.0} max={6.0} step={0.5} value={profile.rating} onChange={(e) => update('rating', parseFloat(e.target.value))} className="w-full" />
            <div className="text-sm text-white/80 mt-1">{profile.rating.toFixed(1)}</div>
          </div>
          <div>
            <label className="block text-sm mb-1">Search Radius (km)</label>
            <input type="range" min={5} max={50} step={5} value={profile.location.radiusKm} onChange={(e) => update('location', { ...profile.location, radiusKm: parseInt(e.target.value) })} className="w-full" />
            <div className="text-sm text-white/80 mt-1">{profile.location.radiusKm} km</div>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Preferred Play Styles</label>
          <div className="flex flex-wrap gap-2">
            {styleOptions.map((s) => (
              <button type="button" key={s} onClick={() => toggleFromArray('playStyles', s)} className={`px-3 py-1 rounded-md border ${profile.playStyles.includes(s) ? 'bg-tennis-green text-white border-transparent' : 'border-white/20 text-white/80 hover:bg-white/10'}`}>{s}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Preferred Time of Day</label>
          <div className="flex flex-wrap gap-2">
            {timeOptions.map((t) => (
              <button type="button" key={t} onClick={() => toggleFromArray('preferredTimes', t)} className={`px-3 py-1 rounded-md border ${profile.preferredTimes.includes(t) ? 'bg-tennis-green text-white border-transparent' : 'border-white/20 text-white/80 hover:bg-white/10'}`}>{t}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Preferred Days</label>
          <div className="flex flex-wrap gap-2">
            {dayOptions.map((d) => (
              <button type="button" key={d} onClick={() => toggleFromArray('preferredDays', d)} className={`px-3 py-1 rounded-md border ${profile.preferredDays.includes(d) ? 'bg-tennis-green text-white border-transparent' : 'border-white/20 text-white/80 hover:bg-white/10'}`}>{d}</button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm mb-1">City</label>
            <input value={profile.location.city} onChange={(e) => update('location', { ...profile.location, city: e.target.value })} className="w-full rounded-md bg-white/5 border-white/10" placeholder="e.g. Austin, TX" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Latitude</label>
              <input type="number" value={profile.location.latitude ?? ''} onChange={(e) => update('location', { ...profile.location, latitude: e.target.value === '' ? null : parseFloat(e.target.value) })} className="w-full rounded-md bg-white/5 border-white/10" placeholder="auto" />
            </div>
            <div>
              <label className="block text-sm mb-1">Longitude</label>
              <input type="number" value={profile.location.longitude ?? ''} onChange={(e) => update('location', { ...profile.location, longitude: e.target.value === '' ? null : parseFloat(e.target.value) })} className="w-full rounded-md bg-white/5 border-white/10" placeholder="auto" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary">Save Profile</button>
          {saved && <span className="text-sm text-white/80">Saved!</span>}
        </div>
      </form>
    </div>
  )
}
