<script setup lang="ts">
interface Props {
  text: String;
  onClick: (payload: MouseEvent) => void;
}

defineProps<Props>();
</script>

<template>
  <button @click="onClick">{{ text }}</button>
</template>

<style scoped>
button {
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  background-image: var(--light-primaryColor);
  box-shadow: 1px 1px 2px var(--softWhite);
  border-radius: var(--borderRadius);
  min-width: 110px;
}

button:hover {
  background-image: var(--light-secondaryColor);
}
</style>
