<template>
  <button class="design-button" @click="onClick" :disabled="disabled">
    {{ label }}
    <slot />
  </button>
</template>

<script>
export default {
  name: 'DesignButton',
  props: {
    label: {
      type: String,
      required: true
    },
    onClick: {
      type: Function,
      default: () => { }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.design-button {
  width: 86%;
  height: 50px;
  font-size: 16px;
  border-radius: 20px;
  border: none;
  color: white;
  margin: 10px auto;
  cursor: pointer;
  display: block;
  text-align: center;
  transition: background-color 0.3s;
  font-weight: bold;
}
</style>