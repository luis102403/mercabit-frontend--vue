import axios from 'axios'

const API_URL = 'http://localhost:3000' 

export const obtenerPerfilUsuario = async () => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data 
}
