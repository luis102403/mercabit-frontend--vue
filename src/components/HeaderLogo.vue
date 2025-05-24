<template>
  <div class="menu-header">
    <!-- Mostrar solo si no estamos en la vista AcercaDeApp -->
    <div class="logo-container">
      <img v-if="!isExcludedRoute" src="/img/LogoEmpresa.png" alt="Logo" class="company-logo" />
      <h2 v-if="!isExcludedRoute" class="logo">Merca<span class="highlight">Bit</span></h2>
    </div>
    <h3 class="page-title">{{ pageTitle }}</h3>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Definir rutas a excluir de la vista del logo y texto
const isExcludedRoute = computed(() => {
  const excludedRoutes = ['/accerca-de-la-app', '/terminos-condiciones'] // Añade más rutas que necesites
  return excludedRoutes.includes(route.path)
})

// Mapeo de rutas a títulos
const pageTitle = computed(() => {
  const titles = {
    '/home': 'Inicio',
    '/accerca-de-la-app': 'Acerca de la App',
    '/mi-cuenta': 'Mi Cuenta',
    '/categorias': 'Categorías',
    '/mis-publicaciones': 'Publicaciones',
    '/agregar-producto': 'Agregar Producto',
    '/ofertas-realizadas': 'Ofertas Realizadas',
    '/mis-compras': 'Mis Compras',
    '/Notification': 'Notificaciones',
    '/buscar': 'Buscar',
  }
  return titles[route.path] || ''
})
</script>

<style scoped>
/* Contenedor flex para el logo y el texto */
.menu-header {
    display: flex;
    align-items: center; /* Alinea los elementos verticalmente */
    justify-content: center; /* Centra horizontalmente */
    flex-wrap: wrap; /* Permite que los elementos salten a la siguiente línea en móviles */
    padding: 10px 10px;
    width: 100%; /* Asegura que ocupe todo el ancho disponible */
}

.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.highlight {
    color: #a64aff; /* Color morado para "Bit" */
}

/* Imagen del logo con altura fija */
.company-logo {
    width: 90px; /* Ajusta según necesites */
    height: auto;
    max-height: 120px; /* Para evitar que crezca demasiado */
    display: block;
    margin-right: 10px; /* Espacio entre el logo y el texto */
    background: none;
    mix-blend-mode: normal; /* Evita que el logo se mezcle con el fondo */
}

/* Estilos para el texto "MercaBit" */
.logo,
.page-title {
  margin: 0 10px;
  white-space: nowrap; /* Evita saltos de línea */
}

.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0; /* Elimina el espacio inferior */
}

/* Media query para dispositivos móviles */
@media (max-width: 768px) {
  .menu-header {
    flex-direction: column;
    align-items: center;
  }
  
  .logo-container {
    width: 100%;
    justify-content: center;
    margin-bottom: 5px;
  }

  .page-title {
    margin-top: 5px;
  }
}
</style>
