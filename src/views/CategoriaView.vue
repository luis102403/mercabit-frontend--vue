<template>
  <div class="page">
    <main class="content">
      <VistaCategoria />
    </main>
  </div>
</template>

<script setup>
import VistaCategoria from '@/components/VistaCategoria.vue';
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>