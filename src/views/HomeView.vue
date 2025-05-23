<template>
  <div class="page">
    <main class="content">
      <VistaProducto />
    </main>
  </div>
</template>

<script setup>
import VistaProducto from '@/components/VistaProducto.vue'  

</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
