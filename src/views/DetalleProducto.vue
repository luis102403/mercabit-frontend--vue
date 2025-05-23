<template>
    <div class="detalle-producto">
        <div v-if="producto" class="contenedor">
            <h2 class="titulo">{{ producto.titulo }}</h2>

            <div class="slider">
                <div class="slide" v-for="(img, index) in producto.imagenes || [producto.imagen_producto]" :key="index">
                    <img :src="img || '/img/imagen-prueba.jpg'" class="imagen-slide" />
                </div>
            </div>

            <p><strong>Descripción detallada:</strong></p>
            <div class="descripcion">
                <p>{{ producto.descripcion }}</p>
            </div>

            <div class="cuenta-regresiva">
                <p><strong>CIERRA:</strong></p>
                <p class="contador">{{ tiempoRestante }}</p>
            </div>

            <div class="fechas">
                <p><strong>FECHA DE CIERRE:</strong>{{ formatoFechaSeguro(producto.fecha_finalizacion) }}</p>
                <p><strong>DÍA APERTURA:</strong>{{ formatoFechaSeguro(producto.fecha_inicio) }}</p>
            </div>

            <div class="estadisticas">
                <p>VISITAS: {{ producto.numero_vistas }}</p>
                <p>OFERTAS: {{ producto.numero_ofertas }}</p>
            </div>

            <div class="precios">
                <p class="precio-actual">Oferta Actual:
                    <strong> {{ formatoMoneda(producto.precio_actual) }} </strong> (COP)
                </p>
                <p class="venta-inmediata">Cierre inmediato: <strong> {{ formatoMoneda(producto.precio_compra_inmediata) }}
                    </strong> (COP)</p>
            </div>

            <div class="nueva-oferta">
                <p class="titulo-oferta">Oferta sugerida:</p>
                <div class="oferta-input">
                    <input type="text" :value="formatoMonedaInput(ofertaSugerida)" readonly
                        class="custom-oferta-input" />
                    <button class="btn-incrementar" @click="incrementarOferta">+</button>
                </div>
                <p class="incremento">Incremento: {{ formatoMoneda(incremento) }}</p>
            </div>

            <DesignButton class="boton-oferta" expand="block" @click="CrearOferta">
                Habilitar Oferta
            </DesignButton>
        </div>

        <div v-else class="loading">Cargando producto...</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerProductosPorID } from '@/services/productService'
import { crearOferta } from '@/services/ofertaService'
import DesignButton from '@/components/DesignButton.vue'

const route = useRoute()
const producto = ref(null)
const tiempoRestante = ref('')
const ofertaSugerida = ref('')
const incremento = ref(100000)

async function CrearOferta() {
    try {
        const response = await crearOferta({
            subasta_id: producto.value.subasta_id,
            cantidad: ofertaSugerida.value
        });

        alert('Oferta creada exitosamente');
        console.log(response);

        // Opcional: recargar datos del producto para ver actualización de oferta actual
        const data = await obtenerProductosPorID(route.params.id);
        producto.value = data;

        // Recalcular oferta sugerida
        ofertaSugerida.value = (Number(data.precio_actual) || 0) + incremento.value;
    } catch (error) {
        console.error('Error al crear oferta:', error);
        alert(error.response?.data?.message || 'Error al crear la oferta');
    }
}

function calcularTiempoRestante(fechaCierre) {
    const ahora = new Date()
    const cierre = new Date(fechaCierre)
    const diferencia = cierre - ahora

    if (diferencia <= 0) return 'Finalizada'

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60))

    return `${dias}d ${horas}h ${minutos}m`
}

function formatoMoneda(valor) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(valor || 0)
}

function formatoMonedaInput(valor) {
    return new Intl.NumberFormat('es-CO', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    }).format(valor || 0)
}

function incrementarOferta() {
    ofertaSugerida.value = Number(ofertaSugerida.value) + incremento.value
}

function formatoFechaSeguro(fechaISO) {
    if (!fechaISO) return 'Fecha no disponible'

    const fecha = new Date(fechaISO)

    return fecha.toLocaleString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
}

onMounted(async () => {
    const id = route.params.id
    try {
        const data = await obtenerProductosPorID(id)
        producto.value = data

        // Oferta sugerida: precio actual + incremento
        ofertaSugerida.value = (Number(data.precio_actual) || 0) + incremento.value

        // Cuenta regresiva
        setInterval(() => {
            tiempoRestante.value = calcularTiempoRestante(data.fecha_finalizacion)
        }, 1000)

    } catch (err) {
        console.error('Error al obtener el producto:', err)
    }
})

</script>

<style scoped>
.detalle-producto .contenedor {
    padding: 50px;
    background: #D9D9D9;
    color: black;
}

.titulo {
    font-weight: bold;
    font-size: 18px;
    text-transform: uppercase;
    margin-bottom: 4px;
}

.slider {
    margin-bottom: 16px;
    display: flex;
    overflow-x: auto;
    gap: 10px;
}

.slide {
    flex: 0 0 auto;
}

.imagen-slide {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 12px;
}

.descripcion {
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 16px;
    border: 2px solid #000000;
}

.cuenta-regresiva {
    margin-bottom: 10px;
}

.contador {
    font-weight: bold;
    font-size: 18px;
}

.fechas p,
.estadisticas p {
    margin: 4px 0;
    font-size: 14px;
}

.estadisticas {
    display: flex;
    justify-content: space-between;
    margin: 12px 0;
    font-weight: bold;
}

.precios {
    margin-top: 12px;
}

.precio-actual,
.venta-inmediata {
    font-size: 16px;
    margin: 4px 0;
}

.nueva-oferta {
    margin-top: 16px;
}

.titulo-oferta {
    margin-bottom: 8px;
    font-weight: bold;
}

.oferta-input {
    display: flex;
    align-items: center;
    gap: 8px;
}

.custom-oferta-input {
    font-weight: bold;
    font-size: 16px;
    text-align: right;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #000;
    width: 100%;
}

.btn-incrementar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #D9D9D9;
    color: #9f0dbc;
    font-size: 18px;
    border: none;
    cursor: pointer;
}

.incremento {
    margin-top: 6px;
    font-size: 13px;
}

.boton-oferta {
    background-color: #9f0dbc;
    color: white;
}

.boton-oferta:hover {
    background-color: #7d0a9b;
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.boton-oferta:active {
    transform: scale(0.98);
    /* Efecto de "presionado" */
    background-color: #6c0887;
}
</style>
