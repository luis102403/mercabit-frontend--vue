<template>
    <div class="productos-container">
      <TarjetaProducto v-for="producto in productosActivos" :key="producto.id" :producto="producto" />
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import TarjetaProducto from '@/components/TarjetaProducto.vue'
  import { obtenerProductosPorCategori } from '@/services/categoriaService'
  
  const productos = ref([]) // Todos los productos
  const productosActivos = ref([]) // Productos filtrados por activos
  
  const route = useRoute()
  const categoriaId = route.params.id
  
  onMounted(async () => {
    try {
      // Obtén los productos de la categoría
      const data = await obtenerProductosPorCategori(categoriaId)
  
      // Filtra los productos activos
      productos.value = data.productos || []
      
      // Filtra los productos activos
      productosActivos.value = productos.value.filter(producto => {
        // Verifica si la subasta está activa (basado en la fecha de finalización y el estado)
        const fechaFinalizacion = new Date(producto.fecha_finalizacion)
        const fechaActual = new Date()
  
        return (
          producto.estado === 'activa' &&
          fechaFinalizacion > fechaActual // Asegúrate de que la fecha de finalización no esté pasada
        )
      })
  
    } catch (err) {
      console.error('Error al obtener productos:', err)
    }
  })
  </script>
  
  <style scoped>
  .productos-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
  </style>
  