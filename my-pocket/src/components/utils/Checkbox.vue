<script setup lang="ts">
interface Props {
  checked: boolean;
  id: string;
  label: string;
}

defineProps<Props>();

defineEmits(["update:checked"]);
</script>

<template>
  <div class="d-flex align-items-center">
    <input
      type="checkbox"
      :id="id"
      @change="$emit('update:checked', !checked)"
      v-model="checked"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<style scoped>
input {
  border: solid var(--borderWidth);
  border-radius: var(--borderRadius);
  border-color: var(--light-textColor);
  margin: 10px;
}
</style>
