import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const crearOferta = async ({ subasta_id, cantidad }) => {
    const token = localStorage.getItem('token');
  
    const response = await axios.post(`${API_URL}/api/ofertas`, {
      subasta_id,
      cantidad
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return response.data;
  };

// Obtiene el historial de ofertas de un usuario específico.
export const historialOfertasUsuario = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`${API_URL}/api/ofertas/usuario/historial`,
    {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};