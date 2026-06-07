import api from './api'

export const getInternships = async () => {
  const response = await api.get('/api/internships')
  return response.data
}

export const createInternship = async (data) => {
  const response = await api.post('/api/internships', data)
  return response.data
}

export const updateInternship = async (id, data) => {
  const response = await api.put(`/api/internships/${id}`, data)
  return response.data
}

export const deleteInternship = async (id) => {
  const response = await api.delete(`/api/internships/${id}`)
  return response.data
}
