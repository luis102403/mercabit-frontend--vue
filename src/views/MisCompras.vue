<template>
  <div class="mis-compras-container">
    <!-- Iteramos sobre las compras agrupadas por fecha -->
    <div v-for="(grupo, nombreProducto) in comprasAgrupadas" :key="nombreProducto" class="grupo-compra">
      <!-- Cabecera de fecha -->
      <div class="fecha-header">
        Productos
      </div>

      <!-- Tarjeta de compra -->
      <div v-for="compra in grupo" :key="compra.id" class="tarjeta-compra">
        <div class="contenido-tarjeta">
          <!-- Imagen del producto -->
          <div class="imagen-producto">
            <img :src="compra.imagen" alt="Imagen del producto" />
          </div>

          <!-- Información de la compra -->
          <div class="info-compra">
            <!-- Estado de la compra -->
            <div class="estado-compra entregado">
              Entregado
            </div>

             <!-- Mensaje adicional -->
             <div class="mensaje-adicional">
              <span v-if="compra.estado === 'entregado'">
                Adquirido el {{ compra.fechaEntrega }}
              </span>
            </div>

            <!-- Nombre del producto -->
            <div class="design-div"> <strong>Nombre: </strong>
              {{ compra.nombProducto }}
            </div>

            <!-- Descripcion del producto -->
            <div class="design-div"> <strong>Descripcion: </strong>
              {{ compra.descripcionProducto }}
            </div>

            <!-- Cantidad -->
            <div class="design-div"> <strong>Precio Comprado: </strong>
              {{ compra.cantidad }}
            </div>

            <!-- Cantidad -->
            <div class="design-div"> <strong>Categoria: </strong>
              {{ compra.categoria }}
            </div>

          </div>

          <!-- Sección de tienda -->
          <div class="seccion-tienda">
            <div class="nombre-tienda">
              <span v-if="compra.tiendaOficial" class="badge-tienda-oficial">
                <i class="fas fa-check-circle"></i>
              </span> <strong>Vendedor:  </strong>
              {{ compra.nombreTienda }}
            </div>
          </div>

          <!-- Sección de botones -->
          <div class="seccion-botones">
            <button class="btn btn-secondary" @click="volverAComprar">Volver a comprar</button>
            <!--Redirige a HomeView.vue-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenerComprasPorUsuario } from '@/services/transaccionService'

export default {
  name: 'MisCompras',
  data() {
    return {
      compras: []  // inicializa vacío
    }
  },
  computed: {
    comprasAgrupadas() {
      // Puedes agrupar por título o por fecha, según lo que te convenga
      const grupos = {};
      this.compras.forEach(compra => {
        if (!grupos[compra.titulo]) {
          grupos[compra.titulo] = [];
        }
        grupos[compra.titulo].push(compra);
      });
      return grupos;
    }
  },
  methods: {
    async cargarCompras() {
      try {
        const data = await obtenerComprasPorUsuario();

        this.compras = data.map(compra => ({
          id: compra.transaccion_id,
          nombProducto: compra.titulo,
          descripcionProducto: compra.descripcion,
          fechaEntrega: new Date(compra.fecha_pago).toLocaleDateString('es-ES', {
            day: 'numeric', month: 'long'
          }),
          estado: 'entregado',
          imagen: compra.imagen_producto,
          cantidad: formatoMoneda(compra.monto_total),
          categoria: compra.categoria,
          nombreTienda: compra.nombre_vendedor,
          tiendaOficial: true
        }));

      } catch (error) {
        console.error('Error al cargar las compras:', error);
      }
    },
    volverAComprar() {
      this.$router.push('/home');
    }
  },
  mounted() {
    this.cargarCompras();
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

</script>

<style scoped>
.mis-compras-container {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}

.grupo-compra {
  margin-bottom: 16px;
  border-radius: 4px;
  overflow: hidden;
}

.fecha-header {
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  color: #333;
}

.tarjeta-compra {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 16px;
}

.contenido-tarjeta {
  display: flex;
  padding: 16px;
  position: relative;
}

.imagen-producto {
  width: 80px;
  height: 80px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.imagen-producto img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.info-compra {
  flex-grow: 1;
  padding-right: 16px;
}

.estado-compra {
  font-weight: bold;
  margin-bottom: 4px;
}

.estado-compra.entregado {
  color: #009900;
}

.mensaje-adicional {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.info-devolucion {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.design-div {
  font-size: 15px;
  color: #333;
  margin-bottom: 4px;
}

.seccion-tienda {
  width: 220px;
  padding: 0 16px;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
}

.nombre-tienda {
  font-size: 14px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}

.badge-tienda-oficial {
  color: #2196f3;
  margin-right: 4px;
}

.tienda-subinfo {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.seccion-botones {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  width: 160px;
  padding-left: 16px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  border: none;
  width: 100%;
}

.btn-secondary {
  background-color: #e3f2fd;
  color: #2196f3;
}

/* Responsive design */
@media (max-width: 768px) {
  .contenido-tarjeta {
    flex-direction: column;
  }

  .seccion-tienda {
    width: 100%;
    border-left: none;
    border-right: none;
    border-top: 1px solid #e0e0e0;
    padding: 16px 0;
    margin: 16px 0;
  }

  .seccion-botones {
    width: 100%;
    flex-direction: row;
    padding-left: 0;
  }
}
</style>