<script setup lang="ts">
interface Props {
  type?: string;
  placeholder?: string;
  value: string | number;
  rows?: number;
}

const { type } = withDefaults(defineProps<Props>(), {
  type: "text",
  rows: 6,
});
</script>

<template>
  <textarea
    :type="type"
    v-model="value"
    @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
    :placeholder="placeholder"
    :rows="rows"
  ></textarea>
</template>

<style scoped>
textarea {
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
