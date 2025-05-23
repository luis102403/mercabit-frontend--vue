<template>
  <div class="agregar-producto">
    <h1>Crear Producto</h1>
    <form @submit.prevent="crearProducto">
      <section class="seccion">
        <h2>Información Básica</h2>

        <div class="form-group">
          <label>Nombre</label>
          <input v-model="producto.nombre" type="text" required placeholder="Ingrese el nombre del producto" />
        </div>

        <div class="form-group">
          <label>Categoría</label>
          <select v-model="producto.categoria" required>
            <option disabled value="">Seleccione una categoría</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Inmuebles">Inmuebles</option>
          <option value="Ropa">Ropa</option>          
          <option value="Hogar y Decoracion">Hogar y Decoracion</option>
          <option value="Industrial y Maquinaria">Industrial y Maquinaria</option>
          <option value="Autos y Motos">Autos y Motos</option>
          </select>
        </div>

        <div class="form-group">
          <label>Descripción del producto</label>
          <textarea v-model="producto.descripcion" ></textarea>
        </div>

        <div class="form-group">
          <label>URL de la Foto</label>
          <input v-model="producto.imagen_producto" type="text" placeholder="Pega la URL de la imagen" />
        </div>

      </section>

      <section class="seccion">
        <h2>Fechas</h2>

        <div class="fecha-hora">
          <div class="form-group">
            <label>Fecha de Apertura</label>
            <input type="text" :value="mostrarFecha(producto.fechaApertura)" placeholder="Seleccione fecha" @focus="mostrarCalendarioApertura = true" readonly />
            <input v-if="mostrarCalendarioApertura" type="date" v-model="producto.fechaApertura" @blur="mostrarCalendarioApertura = false" />
          </div>

          <div class="form-group">
            <label>Hora de Apertura</label>
            <select v-model="producto.horaApertura" required>
              <option disabled value="">Seleccione hora</option>
              <option v-for="hora in horasDisponibles" :key="hora" :value="hora">{{ hora }}:00</option>
            </select>
          </div>
        </div>

        <div class="fecha-hora">
          <div class="form-group">
            <label>Fecha de Cierre</label>
            <input type="text" :value="mostrarFecha(producto.fechaCierre)" placeholder="Seleccione fecha" @focus="mostrarCalendarioCierre = true" readonly />
            <input v-if="mostrarCalendarioCierre" type="date" v-model="producto.fechaCierre" @blur="mostrarCalendarioCierre = false" />
          </div>

          <div class="form-group">
            <label>Hora de Cierre</label>
            <select v-model="producto.horaCierre" required>
              <option disabled value="">Seleccione hora</option>
              <option v-for="hora in horasDisponibles" :key="hora" :value="hora">{{ hora }}:00</option>
            </select>
          </div>
        </div>
      </section>

      <section class="seccion">
        <h2>Precios</h2>

        <div class="form-group">
          <label>Precio Base (COP)</label>
          <input type="number" min="0" step="0.01" v-model="producto.precioBase" />
        </div>

        <div class="form-group">
          <label>Precio Venta Inmediata (COP)</label>
          <input type="number" min="0" step="0.01" v-model="producto.precioVentaInmediata" />
        </div>
      </section>

      <div class="form-group botones">
        <button type="button" class="btn-cancelar" @click="cancelar">Cancelar</button>
        <button type="submit" :disabled="!formularioValido" class="btn-agregar">Agregar Producto</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { crearSubastas } from '@/services/productService';

const router = useRouter();

const producto = ref({
  titulo: '',
  imagen_producto: '',
  descripcion: '',
  categoria_id: null,
  precio_inicial: null,
  precio_compra_inmediata: null,
  duracion: null
})

const mostrarCalendarioApertura = ref(false);
const mostrarCalendarioCierre = ref(false);

const horasDisponibles = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

const formularioValido = computed(() => {
  const catValida = producto.value.categoria !== 'otra' ||
    (producto.value.categoria === 'otra' && producto.value.nuevaCategoria.trim() !== '');

return  producto.value.nombre &&
        producto.value.categoria &&
        catValida &&
        producto.value.descripcion &&
        producto.value.imagen_producto &&
        producto.value.fechaApertura &&
        producto.value.horaApertura &&
        producto.value.fechaCierre &&
        producto.value.horaCierre &&
        producto.value.precioBase !== null &&
        producto.value.precioVentaInmediata !== null;
});

const mostrarFecha = (fechaStr) => {
  if (!fechaStr) return '';
  const [year, month, day] = fechaStr.split('-');
  return `${day}/${month}/${year}`;
};

const cancelar = () => {
  producto.value = {
    nombre: '',
    categoria: '',
    nuevaCategoria: '',
    descripcion: '',
    fotoUrl: '',
    fechaApertura: '',
    horaApertura: '',
    fechaCierre: '',
    horaCierre: '',
    precioBase: null,
    precioVentaInmediata: null
  };
  router.push('/home');
};

// Convertir categoría en ID 
const mapCategoria = (categoria) => {
  const categorias = {
    'Tecnología': 1,
    'Ropa': 2,
    'Inmuebles': 3,
    'Hogar y Decoracion': 4,
    'Industrial y Maquinaria': 5,
    'Autos y Motos': 6
  };
  return categorias[categoria] || 0; // 0 si no existe
};

// Calcular duración en horas
const calcularDuracionEnHoras = (fechaInicio, horaInicio, fechaFin, horaFin) => {
  const inicio = new Date(`${fechaInicio}T${horaInicio}:00`);
  const fin = new Date(`${fechaFin}T${horaFin}:00`);
  const diferenciaMs = fin - inicio;
  return Math.floor(diferenciaMs / (1000 * 60 * 60)); // pasar de ms a horas
};

const crearProducto = async () => {
  try {
    const payload = {
      titulo: producto.value.nombre,
      imagen_producto: producto.value.imagen_producto,
      descripcion: producto.value.descripcion,
      categoria_id: mapCategoria(producto.value.categoria),
      precio_inicial: producto.value.precioBase,
      precio_compra_inmediata: producto.value.precioVentaInmediata,
      duracion: calcularDuracionEnHoras(producto.value.fechaApertura, producto.value.horaApertura, producto.value.fechaCierre, producto.value.horaCierre),
      precio_actual: producto.value.precioBase
    };

    console.log("Enviando payload a crearSubastas:", payload);

    await crearSubastas(payload);

    cancelar();
    router.push('/mis-publicaciones');
  } catch (error) {
    console.error('Error al crear el producto:', error);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
    }
  }
};
</script>

<style scoped>
.agregar-producto {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.seccion {
  margin-bottom: 2rem;
}

h1, h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  
}

input, select, textarea {
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

textarea {
  min-height: 80px;
}

.fecha-hora {
  display: flex;
  gap: 1rem;
}

.botones {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  flex: 1;
  padding: 0.8rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition: background 0.3s;
  width: 150px;
  height: 50px;
  font-size: 16px;
}

.btn-cancelar {
  background-color: #1900bb;
  color: white;
  width: 150px;
  height: 50px;
  font-size: 16px;
}

.btn-cancelar:hover {
  background-color: #ff0000;
}

.btn-agregar {
  background-color: #4caf50;
  color: white;
}

.btn-agregar:hover {
  background-color: #388e3c;
}

.fecha-hora {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dos columnas iguales */
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.fecha-hora .form-group {
  flex: 1;
}

.fecha-hora input,
.fecha-hora select {
  width: 100%;
}
</style>