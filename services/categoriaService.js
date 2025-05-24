import axios from 'axios'

const API_URL = 'http://localhost:3000' 

export const obtenerCategorias = async () => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${API_URL}/api/categorias`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data 
}

export const obtenerProductosPorCategori = async (id) => {
  const token = localStorage.getItem('token')

  try {
    const response = await axios.get(`${API_URL}/api/categorias/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(response.data)  // Verifica qué datos están llegando
    return response.data  // Asegúrate de que devuelves los datos correctos
  } catch (error) {
    console.error('Error al obtener productos:', error)
    return { productos: [] }  // Retorna un objeto con la propiedad productos
  }
}
