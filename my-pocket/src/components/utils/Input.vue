<script setup lang="ts">
interface Props {
  type?: string;
  placeholder?: string;
  value: string | number;
}

const { type } = withDefaults(defineProps<Props>(), {
  type: "text",
});

defineEmits(["update:value"]);
</script>

<template>
  <input
    :type="type"
    v-model="value"
    @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
    :placeholder="placeholder"
  />
</template>

<style scoped>
input {
  border: solid var(--borderWidth);
  border-radius: var(--borderRadius);
  border-color: var(--light-textColor);
  padding: 5px;
  width: 100%;
}

::placeholder {
  background: var(--light-primaryColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
