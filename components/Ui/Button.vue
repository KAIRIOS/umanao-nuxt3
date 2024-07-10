<script setup lang="ts">

const { label, type, small } = withDefaults(defineProps<{
  label?: string,
  type?: string,
  small?: boolean,
}>(), {
  label: '',
  type: 'button',
  small: false
})
const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="btn"
    :class="{ 'btn-sm': small }"
    :type="type"
    @click="emit('click')"
  >
    <span v-if="label">{{ label }}</span>
    <slot />
  </button>
</template>
