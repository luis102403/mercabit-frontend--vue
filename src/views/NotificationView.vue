<template>
    <div class="notificaciones">
      <h1>Notificaciones</h1>
  
      <div v-if="notificaciones.length === 0" class="empty-state">
        No hay notificaciones por ahora
      </div>
  
      <div class="notificaciones-lista">
        <div
          v-for="notificacion in notificaciones"
          :key="notificacion.id"
          class="notificacion-card"
        >
          <div class="notificacion-header">
            <span class="mensaje">{{ notificacion.mensaje }}</span>
            <span class="fecha">{{ formatoFecha(notificacion.timestamp) }}</span>
          </div>
          <div class="acciones">
            <button @click="eliminarNotificacion(notificacion.id)">Eliminar</button>
          </div>
          <div class="subasta-info">
            <router-link
              v-if="notificacion.subasta_id"
              :to="`/producto/${notificacion.subasta_id}`"
              class="titulo-subasta"
            >
              Subasta: {{ notificacion.titulo_subasta }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import {obtenerNotificacionesUsuario} from '@/services/notificacionesService'
  const notificaciones = ref([])
  /*
  const notificaciones = ref([
    {
      id: "1",
      mensaje: "¡Tu subasta ha sido creada con éxito!",
      timestamp: new Date().toISOString()
    },
    {
      id: "2",
      mensaje: "Un usuario ha ofertado por tu producto",
      timestamp: new Date().toISOString()
    }
  ]);
  */
  // --- Firebase COMENTADO ---
  // import { db } from '../firebase/FirebaseConfig';
  // import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
  
  // onMounted(() => {
  //   const notificacionesRef = collection(db, 'notificaciones');
  //   onSnapshot(notificacionesRef, (snapshot) => {
  //     notificaciones.value = snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }));
  //   });
  // });
  
  onMounted(async () => {
  try {
    const data = await obtenerNotificacionesUsuario()

    // Mapear para usar el campo correcto como 'id'
    notificaciones.value = data.map(n => ({
      id: n.notificacion_id, // <- Usa el campo real del backend
      mensaje: n.mensaje,
      timestamp: n.fecha_envio,
      titulo_subasta: n.titulo_subasta, // opcional si lo quieres mostrar
      subasta_id: n.subasta_id
    }))
    } catch (error) {
    console.error('Error al obtener notificaciones:', error)
    }
  })

  const eliminarNotificacion = (id) => {
    notificaciones.value = notificaciones.value.filter(n => n.id !== id);
  
    // --- Firebase COMENTADO ---
    // try {
    //   await deleteDoc(doc(db, 'notificaciones', id));
    //   notificaciones.value = notificaciones.value.filter(n => n.id !== id);
    // } catch (error) {
    //   console.error('Error al eliminar notificación:', error);
    // }
  };
  
  const formatoFecha = (isoString) => {
    const fecha = new Date(isoString);
    return fecha.toLocaleString('es-CO');
  };
  </script>
  
  <style scoped>
  .notificaciones {
    max-width: 700px;
    margin: auto;
    padding: 2rem;
  }
  
  .notificaciones-lista {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .notificacion-card {
    background-color: #2c65ff;
    color: #f0f8ff;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }
  
  .titulo-subasta {
  font-size: 0.8rem;
  color: #ffeaa7;
  text-decoration: underline;
  cursor: pointer;
  }

  
  .subasta-info {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #dbe6ff;
  opacity: 0.9;
  font-style: italic;
  }

  .notificacion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .mensaje {
    flex: 1;
  }
  
  .fecha {
    font-size: 0.8rem;
    background: #ffffff33;
    padding: 0.2rem 0.6rem;
    border-radius: 0.5rem;
  }
  
  .acciones {
    display: flex;
    justify-content: flex-end;
  }
  
  button {
    background-color: #dc3545;
    border: none;
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .empty-state {
    text-align: center;
    font-style: italic;
    color: #888;
    margin-top: 2rem;
  }
  </style>
  