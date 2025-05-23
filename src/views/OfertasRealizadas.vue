<template>
  <div class="ofertas-container">

    <h2>Historial de Ofertas</h2>
    <div class="historial">
      <div v-for="(oferta, index) in historial" :key="index" class="oferta-card card">
        <p><strong>Mi oferta:</strong> {{ formatoMoneda(oferta.cantidad) }}</p>
        <p><strong>Producto:</strong> {{ oferta.tituloSubasta }}</p>
        <p><strong>Estado de la Oferta:</strong> {{ oferta.estado }}</p>
        <p><strong>Fecha:</strong> {{ oferta.fecha }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { historialOfertasUsuario } from '@/services/ofertaService'

const highestBid = ref(0)
const historial = ref([])

// Función para cargar historial del backend
const cargarHistorial = async () => {
  try {
    const ofertas = await historialOfertasUsuario()
    console.log('Ofertas cargadas:', ofertas)

    historial.value = ofertas.map(oferta => ({
      usuario: 'Tú', // O nombre si lo tienes
      cantidad: oferta.cantidad,
      fecha: oferta.fecha_hora.slice(0, 16).replace('T', ' '),
      tituloSubasta: oferta.titulo_subasta,
      estado: oferta.estado
    }))

    if (historial.value.length > 0) {
      highestBid.value = Math.max(...historial.value.map(o => o.cantidad))
    }
  } catch (error) {
    console.error('Error al cargar historial de ofertas:', error)
  }
}


// Formatear Moneda
function formatoMoneda(valor) {
  if (!valor || isNaN(valor)) {
    return ''
  }

  return Number(valor).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });
}

// Cargar historial cuando se monte el componente
onMounted(() => {
  cargarHistorial()
})
</script>
ss

<style scoped>
.ofertas-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Arial', sans-serif;
}

h1,
h2 {
  color: #333;
  text-align: center;
}

.card {
  background-color: #f4f4f4;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

input[type="number"] {
  padding: 0.5rem;
  margin-right: 0.5rem;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #9f6dfd;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #7a4de0;
}

.historial {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>