<template>
  <div class="mis-publicaciones">
    <h1>Mis Publicaciones</h1>

    <div v-if="productos.length > 0" class="lista-productos">
      <div v-for="producto in productos" :key="producto.id" class="producto-card">
        <h2>{{ producto.nombre }}</h2>
        <p><strong>Estado:</strong> {{ producto.estado }}</p>
        <p><strong>Categoría:</strong> {{ producto.categoria }}</p>
        <p><strong>Precio base:</strong> {{ formatoMoneda(producto.precioBase) }} COP</p>
        <p><strong>Venta inmediata:</strong> {{ formatoMoneda(producto.precioVentaInmediata) }} COP</p>
        <p><strong>Desde:</strong> {{ formatearFecha(producto.fechaApertura) }}</p>
        <p><strong>Hasta:</strong> {{ formatearFecha(producto.fechaCierre) }}</p>
        <p><strong>Publicado:</strong> {{ formatearFechaHora(producto.creadoEn) }}</p>

        <div class="producto-imagen">
          <img :src="producto.imagen" alt="Imagen del producto" />
        </div>

        <div class="botones">
          <button @click="marcarComoVendido(producto.id)">Vendido</button>
          <button @click="eliminarProducto(producto.id)">Borrar</button>
        </div>
      </div>
    </div>

    <p v-else>No tienes productos publicados aún.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { obtenerSubastasPorVendedor } from '@/services/productService'

const productos = ref([]);

/*
  const productos = ref([
  {
    id: "1",
    nombre: "Martillo eléctrico",
    categoria: "Construcción",
    precioBase: 50000,
    precioVentaInmediata: 100000,
    fechaApertura: "2025-04-12",
    fechaCierre: "2025-04-14",
    creadoEn: new Date().toISOString()
  },
  {
    id: "2",
    nombre: "Moto Yamaha",
    categoria: "Motos",
    precioBase: 3000000,
    precioVentaInmediata: 5000000,
    fechaApertura: "2025-04-13",
    fechaCierre: "2025-04-20",
    creadoEn: new Date().toISOString()
  }
]);
*/

const eliminarProducto = (id) => {
  productos.value = productos.value.filter(p => p.id !== id);
};

const marcarComoVendido = (id) => {
  productos.value = productos.value.filter(p => p.id !== id);
};

const formatearFecha = (fecha) => {
  if (!fecha) return '';
  const [y, m, d] = fecha.split('-');
  return `${d}/${m}/${y}`;
};

const formatearFechaHora = (fecha) => {
  if (!fecha) return '';
  const f = new Date(fecha);
  return f.toLocaleString('es-CO');
};

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

// Llamar a la API para obtener los datos del usuario al montar el componente
onMounted(async () => {
  try {
    const subastas = await obtenerSubastasPorVendedor();
    console.log('Subastas recibidas:', subastas);

    productos.value = subastas.map(subasta => ({
      id: subasta.subasta_id,
      nombre: subasta.titulo,
      estado: subasta.estado,
      categoria: subasta.nombre_categoria, 
      precioBase: subasta.precio_inicial,
      precioVentaInmediata: subasta.precio_compra_inmediata,
      fechaApertura: subasta.fecha_inicio.split('T')[0],
      fechaCierre: subasta.fecha_finalizacion.split('T')[0],
      creadoEn: subasta.fecha_inicio,
      imagen: subasta.imagen_producto
    }));
  } catch (error) {
    console.error('Error al obtener subastas del vendedor', error);
  }
});
</script>

<style scoped>
.mis-publicaciones {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}

.lista-productos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.producto-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.producto-contenido {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.producto-info {
  flex: 1;
}

.producto-imagen {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  margin-left: 1rem;
}

.producto-imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.botones {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

button:first-child {
  background-color: #28a745;
  color: white;
}

button:last-child {
  background-color: #dc3545;
  color: white;
}
</style>