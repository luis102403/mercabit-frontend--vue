<template>
  <div class="layout">
    <div :class="{ 'with-sidebar': route.meta.showMenu }">
      <HeaderLogo />
    </div>

    <div class="content-wrapper" :class="{ 'with-sidebar': route.meta.showMenu && !isMobile }">
      <main class="main-content">
        <router-view />
      </main>
    </div>

    <footer :class="{ 'with-sidebar': route.meta.showMenu && !isMobile }">
      <div class="footer-content">
        <p>MercaBit &copy; 2025 Todos los derechos reservados</p>
      </div>
    </footer>

    <!-- Menú fijo, se renderiza aparte del flujo -->
    <MenuDiagonal v-if="route.meta.showMenu" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import HeaderLogo from '@/components/HeaderLogo.vue';
import MenuDiagonal from '@/components/MenuDiagonal.vue';

const route = useRoute();
const isMobile = ref(false);

// Función para detectar si es un dispositivo móvil
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

// Ejecutar al montar el componente
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

// Limpiar el event listener al desmontar
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* El contenido se ajusta automáticamente si hay menú */
.content-wrapper {
  flex: 1;
  display: flex;
  transition: margin-left 0.3s ease;
  padding-bottom: 50px; 
}

.content-wrapper.with-sidebar {
  margin-left: 220px;
  /* Igual al width del sidebar */
}

.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto; 
}

/* Footer */
footer {
  padding: 10px 0;
  text-align: center;
  background-color: #f8f8f8;
  position: relative;
  width: 100%;
  z-index: 10;
  transition: margin-left 0.3s ease;
}

footer.with-sidebar {
  margin-left: 220px;
}

.footer-content p {
  margin: 5px 0;
  font-size: 16px;
  opacity: 0.9;
}

/* Media queries para dispositivos móviles */
@media (max-width: 768px) {
  .content-wrapper, 
  footer {
    margin-left: 0 !important; /* Eliminar margen en móviles */
  }
}
</style>
