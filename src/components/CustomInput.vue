<template>
    <div class="custom-input-wrapper">
      <input
        class="custom-input"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
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
        default: 'text',
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
  }
  </style>
  