<template>
  <div class="page-container">

    <main class="content-bg">
      <div class="profile-section">
        <div class="profile-image-container">
          <img class="profile-image" :src="userPhoto" alt="Foto de perfil" />
          <div class="camera-icon">📷</div>
        </div>

        <div class="form-card">
          <div class="form-item">
            <p><strong>Nombre: <br></strong> {{ userName }}</p>
          </div>

          <div class="form-item">
            <p><strong>CC: <br></strong> {{ userCC }}</p>
          </div>

          <div class="form-item">
            <p><strong>Correo: <br></strong> {{ userEmail }}</p>
          </div>

          <div class="form-item">
            <p><strong>Saldo: $<br></strong> {{ formatoMoneda(userSaldo) }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerPerfilUsuario } from '@/services/userServices'

const userName = ref('Cargando...')
const userCC = ref('Cargando...')
const userEmail = ref('Cargando...')
const userPhoto = ref('/img/LogoEmpresa.png')
const userSaldo = ref('Cargando...')

// Llamar a la API para obtener los datos del usuario al montar el componente
onMounted(async () => {
  try {
    const userProfile = await obtenerPerfilUsuario()
    userName.value = userProfile.nombre_usuario || 'Usuario'
    userCC.value = userProfile.cedula || 'Cedula'
    userEmail.value = userProfile.email || 'Correo'
    userPhoto.value = userProfile.foto_usuario || '/img/LogoEmpresa.png' // Foto del perfil, si existe
    userSaldo.value = userProfile.saldo || 'Saldo'
  } catch (error) {
    console.error('Error al obtener el perfil del usuario', error)
  }
})

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
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
}

.content-bg {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.profile-image-container {
  position: relative;
  width: 110px;
  height: 110px;
}

.profile-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}

.camera-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  border-radius: 50%;
  padding: 4px;
  font-size: 20px;
  color: #333;
}

.form-card {
  width: 90%;
  max-width: 400px;
  background-color: white;
  border-radius: 20px;
  padding: 1.2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.form-item {
  border: 2px solid #a64aff;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin: 10px auto;
  display: block;
}
</style>