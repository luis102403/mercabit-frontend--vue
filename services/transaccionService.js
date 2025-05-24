import axios from 'axios'

const API_URL = 'http://localhost:3000' 

// Conexion backend comprar del usuario
export const obtenerComprasPorUsuario = async () => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${API_URL}/api/transacciones/compras`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data 
}

// Conexion backend ventas del usuario
export const obtenerVentasPorUsuario = async () => {
    const token = localStorage.getItem('token')
  
    const response = await axios.get(`${API_URL}/api/transacciones/ventas`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  
    return response.data 
  }
