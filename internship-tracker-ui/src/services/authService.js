import api from './api'

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password })
  const payload = response.data || {}

  if (payload.token) {
    localStorage.setItem('token', payload.token)
    localStorage.setItem('user', JSON.stringify(payload.user || {}))
  }

  return payload
}

export const register = async (name, email, password) => {
  const response = await api.post('/api/auth/register', { name, email, password })
  return response.data
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}

export const isAuthenticated = () => Boolean(localStorage.getItem('token'))
