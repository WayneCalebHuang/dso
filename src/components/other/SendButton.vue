<script setup>
import { ref } from 'vue';

defineProps({
  clickFunc: { type: Function },
  backgroundColor: { type: String, default: 'var(--color-deloitte)' },
  borderRadius: { type: String, default: '1rem' }
});
const button = ref(null);
</script>

<template>
  <button @click="clickFunc" ref="button">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  width: fit-content;
  display: block;
  margin: auto;
  margin-top: 2rem;
  background-color: v-bind(backgroundColor);
  border: none;
  color: #fff;
  font-size: 1rem;
  padding: 0.375rem 1.5rem;
  border-radius: v-bind(borderRadius);
  cursor: pointer;

  &:hover {
    box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.2);
    background-color: green;
  }
}
</style>
