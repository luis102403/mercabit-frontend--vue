<template>
  <!-- Botón de menú hamburguesa (visible solo en móviles) -->
  <button class="menu-toggle" @click="toggleMenu">
    <Icon icon="ion:menu-outline" class="menu-icon" />
  </button>

  <!-- Sidebar (menú completo) -->
  <aside class="sidebar" :class="{ 'active': isMenuOpen }">
    <!-- Botón para cerrar el menú en móviles -->
    <button class="close-menu" @click="toggleMenu">
      <Icon icon="ion:close-outline" class="icon" />
    </button>

    <!-- Logo y título -->
    <div class="menu-header">
      <img src="/img/LogoEmpresa.png" alt="Logo" class="company-logo" />
      <h2 class="logo">Merca<span class="highlight">Bit</span></h2>
    </div>

    <!-- Lista del menú con scroll -->
    <nav class="menu-list">
      <RouterLink to="/home" class="menu-item" @click="closeMenuIfMobile">
        <Icon icon="ion:home-outline" class="icon" />
        <span>Inicio</span>
      </RouterLink>
      <RouterLink to="/Notification" class="menu-item" @click="closeMenuIfMobile">
        <Icon icon="ion:notifications-outline" class="icon" />
        <span>Notificaciones</span>
      </RouterLink>
      <RouterLink to="/mis-compras" class="menu-item" @click="closeMenuIfMobile">
        <Icon icon="ion:cart-outline" class="icon" />
        <span>Mis Compras</span>
      </RouterLink>
      <RouterLink to="/ofertas-realizadas" class="menu-item" @click="closeMenuIfMobile">
        <Icon icon="ion:checkmark-circle-outline" class="icon" />
        <span>Ofertas realizadas</span>
      </RouterLink>
      <RouterLink to="/agregar-producto" class="menu-item" @click="closeMenuIfMobile">
        <Icon icon="ion:add-outline" class="icon" />
        <span>Agregar producto</span>
      </RouterLink>
      <RouterLink to="/mis-publicaciones" class="menu-item" @click="closeMenuIfMobile">
        <Icon icon="ion:bag-check-outline" class="icon" />
        <span>Mis publicaciones</span>
      </RouterLink>
      <RouterLink to="/categorias" class="menu-item" @click="closeMenuIfMobile">
        <Icon icon="ion:folder-outline" class="icon" />
        <span>Categorías</span>
      </RouterLink>
      <RouterLink to="/mi-cuenta" class="menu-item" @click="closeMenuIfMobile">
        <Icon icon="ion:person-outline" class="icon" />
        <span>Mi Cuenta</span>
      </RouterLink>
      <RouterLink to="/accerca-de-la-app" class="menu-item" @click="closeMenuIfMobile">
        <Icon icon="ion:information-circle-outline" class="icon" />
        <span>Acerca de la App</span>
      </RouterLink>
    </nav>

    <!-- Sección inferior fija -->
    <div class="bottom-section">
      <div class="user-section">
        <img :src="userPhoto" alt="Usuario" class="user-avatar" />
        <p class="user-name">{{ userName }}</p>
      </div>

      <button class="logout-button" @click="logout">
        <Icon icon="ion:log-out-outline" class="icon" />
        Cerrar sesión
      </button>
    </div>
  </aside>

  <!-- Overlay para cerrar el menú al hacer clic fuera (solo móviles) -->
  <div class="menu-overlay" v-if="isMenuOpen" @click="toggleMenu"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { obtenerPerfilUsuario } from '@/services/userServices'

const router = useRouter()
const isMenuOpen = ref(false)

const userName = ref('Cargando...')
const userPhoto = ref('/img/LogoEmpresa.png') 

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  
  // Bloquear el scroll del body cuando el menú está abierto en móviles
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenuIfMobile = () => {
  // Cerrar el menú automáticamente al hacer clic en un enlace solo en móviles
  if (window.innerWidth <= 768) {
    isMenuOpen.value = false
    document.body.style.overflow = ''
  }
}

const logout = () => {
  console.log('Sesión cerrada')
  localStorage.removeItem('token')
  isMenuOpen.value = false
  document.body.style.overflow = ''
  router.push('/login')
}

// Llamar a la API para obtener los datos del usuario al montar el componente
onMounted(async () => {
  try {
    const userProfile = await obtenerPerfilUsuario()
    userName.value = userProfile.nombre_usuario || 'Usuario'
    userPhoto.value = userProfile.foto_usuario || '/img/LogoEmpresa.png' // Foto del perfil, si existe
  } catch (error) {
    console.error('Error al obtener el perfil del usuario', error)
  }
})
</script>

<style scoped>
/* Botón del menú hamburguesa (visible solo en móviles) */
.menu-toggle {
  display: none; /* Oculto por defecto en desktop */
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1100;
  background: #000;
  color: white;
  border: none;
  border-radius: 5px;
  width: 45px;
  height: 45px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  font-size: 1.8rem;
}

/* Botón para cerrar el menú en móviles */
.close-menu {
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Overlay para cerrar el menú al hacer clic fuera */
.menu-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 220px;
  background: #000;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.menu-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
}

.company-logo {
  width: 40px;
  margin-right: 10px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.highlight {
  color: #a64aff;
}

.menu-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 5px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px;
  color: white;
  text-decoration: none;
  transition: background 0.2s;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

/* Sección inferior */
.bottom-section {
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-section {
  text-align: center;
  padding: 20px 10px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid white;
  margin-bottom: 10px;
}

.user-name {
  font-size: 1.2rem;
  color: white;
}

.logout-button {
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 8px;
  height: 35px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  cursor: pointer;
  padding: 0 10px;
}

/* Media queries para dispositivos móviles */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex; /* Mostrar botón hamburguesa en móviles */
  }
  
  .close-menu {
    display: block; /* Mostrar botón de cierre en móviles */
  }
  
  .menu-overlay {
    display: block; /* Mostrar overlay cuando el menú está activo */
  }
  
  .sidebar {
    transform: translateX(-100%); /* Ocultar el menú fuera de la pantalla */
    width: 80%; /* El menú ocupa el 80% del ancho en móviles */
    max-width: 300px;
  }
  
  .sidebar.active {
    transform: translateX(0); /* Mostrar el menú cuando está activo */
  }
}
</style>
