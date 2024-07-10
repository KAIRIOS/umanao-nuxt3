<script setup lang="ts">
definePageMeta({
  name: 'BacASable',
})

import Button from '~/components/Ui/Button.vue'
import Modal from '~/components/Ui/Modal.vue'
import Loading from '~/components/Ui/Loading.vue'

const showModal = ref(false)
const showModalTest = ref(false)
const toast = ref(null)
const { $notify } = useNuxtApp()
const loading = ref(false)
const modalTest = ref(null)
const theModal = ref(null)

const openModal = () => {
  showModal.value = true
}

const openModalTest = () => {
  showModalTest.value = true
}

const handleCloseModalTest = () => {
  showModalTest.value = false
}

const closePromiseModal = () => {
  console.log('closePromiseModal')
  showPromise.value = false
}

const openNotify = () => {
  $notify('success', 'Test Notify Success')
  $notify('error', 'Test Notify Error')
  $notify('info', 'Test Notify Info')
}

</script>

<template>
  <div class="container-fluid">
    <div class="vstack gap-2">
      <div class="border border-secondary-subtle p-2" style="border-radius: 4px;">
        <div class="hstack gap-2">
          <Button class="btn-info" label="Avec Label" />
          <Button class="btn-info">Sans Label</Button>
          <Button class="btn-info" label="Avec Label + Small" small />
          <Button class="btn-info" small>Sans Label + Small</Button>
        </div>
      </div>

      <div class="border border-secondary-subtle p-2" style="border-radius: 4px;">
        <div class="hstack gap-2">
          <div>
            <Button class="btn-info" label="Open Modal" @click="openModal" />
            <div class="vstack gap-2">
              <span> Show Modal : {{ showModal }}</span>
            </div>
          </div>
          <div>
            <Button class="btn-warning" label="OpenModalTest" @click="openModalTest" />
            <div class="vstack gap-2">
              <span> Show Modal Test: {{ showModalTest }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="border border-danger border-opacity-50 p-2" style="border-radius: 4px;">
        <div class="hstack gap-2">
          <Button class="btn-umanao" label="Test Notify" @click="openNotify" />
        </div>
      </div>

      <div class="d-flex gap-2">
        <Button class="btn-outline-primary" label="Test Loading True" @click="loading = true" />
        <Button class="btn-outline-danger" label="Test Loading False" @click="loading = false" />
      </div>
      <div class="border border-info p-2 position-relative" style="border-radius: 4px; height: 100px">
        <Loading v-if="loading" />
      </div>
    </div>

    <Modal :show="showModal" :show-close="true" @close="showModal = false">
      <template #header>
        <h5 class="modal-title">Modal title</h5>
      </template>
      <div>
        <p>Modal content</p>
      </div>
      <template #footer>
        <Button class="btn-umanao" label="Fermer" data-bs-dismiss="modal" @click="showModal = false" />
      </template>
    </Modal>

    <Modal :show="showModalTest" ref="modalTest" :show-close="true" @close="showModalTest = false">
      <template #header>
        <h5 class="modal-title">Modal title test</h5>
      </template>
      <div>
        <p>Modal content Test</p>
      </div>
      <template #footer>
        <Button
          class="btn-umanao"
          label="Fermer"
          @click="handleCloseModalTest"
        />
      </template>
    </Modal>
  </div>
</template>
