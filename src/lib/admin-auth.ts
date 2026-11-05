export const ADMIN_CREDENTIALS = {
  email: 'admin@skiesbynas.com',
  password: 'admin123',
  name: 'Admin Skies',
  role: 'Super Administrator',
}

const STORAGE_KEY = 'skies_admin_token'
const COOKIE_NAME = 'skies_admin_session'

export interface AdminUser {
  email: string
  name: string
  role: string
  loginAt: string
}

export function setAdminSession(user: AdminUser) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    // Set cookie for 7 days
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(user)
    )}; path=/; max-age=604800; SameSite=Lax`
  } catch (e) {
    console.error('Failed to set admin session', e)
  }
}

export function getAdminSession(): AdminUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AdminUser
  } catch {
    return null
  }
}

export function clearAdminSession() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`
  } catch (e) {
    console.error('Failed to clear admin session', e)
  }
}

export function validateAdminLogin(email: string, pass: string): { success: boolean; error?: string } {
  const cleanEmail = email.trim().toLowerCase()
  const cleanPass = pass.trim()

  if (!cleanEmail || !cleanPass) {
    return { success: false, error: 'Email dan password wajib diisi' }
  }

  if (cleanEmail === ADMIN_CREDENTIALS.email && cleanPass === ADMIN_CREDENTIALS.password) {
    return { success: true }
  }

  return { success: false, error: 'Email atau password admin tidak valid' }
}

