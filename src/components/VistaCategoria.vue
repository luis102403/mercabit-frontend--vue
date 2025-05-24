<template>
    <div class="categorias-container">
        <TarjetaCategoria v-for="categoria in categorias" :key="categoria.id" :categoria="categoria" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TarjetaCategoria from '@/components/TarjetaCategoria.vue'
import { obtenerCategorias } from '@/services/categoriaService'

const categorias = ref([])

onMounted(async () => {
    try {
        categorias.value = await obtenerCategorias() 
    } catch (err) {
        console.error('Error al obtener las categorias:', err)
    }
})

</script>

<style scoped>
.categorias-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}
</style>
