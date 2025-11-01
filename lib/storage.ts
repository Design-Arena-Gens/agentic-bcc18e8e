import type { Profile } from './types'

const KEY = 'rallymatch.profile.v1'

export function loadProfile(): Profile | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Profile
    return parsed
  } catch {
    return null
  }
}

export function saveProfile(profile: Profile): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(profile))
  } catch {
    // noop
  }
}
