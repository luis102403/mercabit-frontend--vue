<template>
    <div class="tarjeta-producto" @click="irADetalles">
        <img :src="categoria.foto_categoria || '/img/imagen-prueba.jpg'" alt="Imagen del producto" />

        <div class="contenido">
            <p>{{categoria.nombre}}</p>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { useRouter } from 'vue-router'

const props = defineProps({
    categoria: {
        type: Object,
        required: true
    }
})

const router = useRouter()

function irADetalles() {
    router.push(`/categoria/${props.categoria.categoria_id}`) // Redirige a la ruta del detalle del producto
}

</script>

<style scoped>
.tarjeta-producto {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    background-color: #fff;
}

.tarjeta-producto:hover {
    transform: scale(1.02);
}

img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.contenido {
    padding: 16px;
    text-align: center;
}

.titulo {
    font-size: 1.3em;
    margin-bottom: 4px;
}

.categoria {
    font-size: 1em;
    color: #666;
    margin-bottom: 12px;
}

.producto-info p {
    margin: 4px 0;
}
</style>