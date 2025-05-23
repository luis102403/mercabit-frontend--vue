<template>
  <div class="acerca-container">
    <div class="acerca-card">
      <img src="../../public/img/LogoEmpresa.png" alt="Logo" class="logo" />
      <h2>MercaBit</h2>
      <p class="version">Versión 1.0</p>
      <p class="copyright">Copyright © 2025 MercaBit<br />Cali, Colombia</p>
      <button @click="verTerminos">Términos y Condiciones</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AcercaDeApp',
  methods: {
    verTerminos() {
      this.$router.push('/terminos-condiciones');
    }
  }
}
</script>

<style scoped>
.acerca-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e5e5e5;
}

.acerca-card {
  background: #f8f8f8;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: center;
  width: 90%;
  max-width: 350px;
}

.logo {
  max-width: 150px;
  margin-bottom: 1rem;
}

.version {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
}

button {
  margin-top: 1.5rem;
  padding: 0.6rem 1rem;
  background-color: #3730a3;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #2c268c;
}
</style>
