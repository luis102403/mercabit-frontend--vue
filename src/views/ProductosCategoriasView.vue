<template>
  <div class="page">
    <main class="content">
      <VistaProductoCategoria />
    </main>
  </div>
</template>

<script setup>
import VistaProductoCategoria from '@/components/VistaProductoCategoria.vue'  

</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
