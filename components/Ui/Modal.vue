<script setup lang="ts">
const props = withDefaults(defineProps<{
  show?: boolean,
  showClose?: boolean,
}>(), {
  show: false,
  showClose: true,
})

const { show, showClose } = toRefs(props)
const emit = defineEmits(['close'])
const modal = ref(null)
const theModal = ref(null)

watch(() => show.value, (value) => {
  if (!theModal.value) {
    const { $bootstrap } = useNuxtApp();
    theModal.value = new $bootstrap.Modal(modal.value, {
      keyboard: false,
      backdrop: 'static',
    })
  }
  if (value) {
    theModal.value.show()
  } else {
    theModal.value.hide()
    theModal.value = null
  }
})

defineExpose({
  modal,
})
</script>

<template>
  <div ref="modal" class="modal fade" tabindex="-1" :aria-hidden="!show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div v-if="$slots.header" class="modal-header">
          <h5 class="modal-title">
            <slot name="header" />
          </h5>
          <button
            v-if="showClose"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="emit('close')"
          />
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <button v-if="showClose" type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="emit('close')">
            Annuler
          </button>
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
