<script setup lang="ts">
import Modal from '~/components/Ui/Modal.vue'

const emit = defineEmits(['show', 'close'])

const isVisible = ref(false)
const isResolved = ref(false)
const resolvePromise = ref(undefined)
const rejectPromise = ref(undefined)

const show = () => {
  isVisible.value = true
  isResolved.value = false
  return new Promise((resolve, reject) => {
    resolvePromise.value = resolve
    rejectPromise.value = reject
  })
}

const _confirm = (value) => {
  isVisible.value = false
  isResolved.value = value
}

const cancel = () => {
  isVisible.value = false
  if (resolvePromise.value) resolvePromise.value(false)
}

const close = () => {
  isVisible.value = false
  if (resolvePromise.value) resolvePromise.value(isResolved.value)
}

</script>

<template>
  <Modal :show="isVisible" :show-close="true" @close="emit('close')">
    <template v-if="$slots.header" #header >
      <slot name="header" />
    </template>
    <slot name="content" />
    <template #footer>
      <slot name="footer" />
    </template>
  </Modal>
</template>
