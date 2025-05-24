import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const obtenerProductosActivos = async () => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${API_URL}/api/subastas/activas`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

export const obtenerProductos = async () => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${API_URL}/api/subastas/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

export const obtenerProductosPorID = async (id) => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${API_URL}/api/subastas/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

export const obtenerSubastasPorVendedor = async () => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${API_URL}/api/subastas/vendedor/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

export const crearSubastas = async (subastaData) => {
  const token = localStorage.getItem('token')

  const response = await axios.post(
    `${API_URL}/api/subastas/create`,
    subastaData,  // Aquí van los datos de la subasta
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}