<template>
    <div class="productos-container">
        <TarjetaProducto v-for="producto in productos" :key="producto.id" :producto="producto" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TarjetaProducto from '@/components/TarjetaProducto.vue'
import { obtenerProductosActivos } from '@/services/productService'

const productos = ref([])

onMounted(async () => {
    try {
        productos.value = await obtenerProductosActivos() 
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
