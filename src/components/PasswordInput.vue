<template>
  <div class="custom-input-wrapper">
    <input
      class="custom-input"
      :type="inputType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button class="toggle-password" @click="togglePasswordVisibility">
      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Correo electrónico',
    },
    type: {
      type: String,
      default: 'password',
    },
  },
  data() {
    return {
      showPassword: false, // Controla si la contraseña es visible o no
    };
  },
  computed: {
    inputType() {
      return this.showPassword ? 'text' : 'password'; // Cambia el tipo según el estado
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword; // Alterna entre mostrar u ocultar la contraseña
    },
  },
};
</script>

<style scoped>
.custom-input {
  width: 80%;
  height: 50px;
  font-size: 16px;
  margin-bottom: 15px;
  padding: 0 15px;
  border-radius: 25px;
  border: 1px solid #ccc;
  background: #cacaca;
  color: black;
}

.custom-input-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 30px; 
  top: 45%; 
  transform: translateY(-60%); 
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
