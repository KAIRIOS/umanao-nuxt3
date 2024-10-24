<script setup lang="ts">
import Modal from '~/components/Ui/Modal.vue'
import Button from '~/components/Ui/Button.vue';

const props = defineProps<{
  show: Boolean
  idExercice: Number
  idCard: Number
}>()

const MODEL_CARD = {
  id: null,
  libelle: null,
  texte: null,
}

const { $api, $notify } = useNuxtApp();
const emit = defineEmits(['close', 'create', 'edit'])
const form = ref({})
const loading = ref(false)

const libelleCTA = computed(() => {
  return props.idCard ? 'Modifier' : 'Ajouter'
})

const AddorUpdateCard = async () => {
  try {
    loading.value = true
    if (props.idCard) {
      const response = await $api(`exercice/card/${props.idCard}`, {
        method: 'POST',
        body: form.value
      })
      emit('edit', response)
    } else {
      const response = await $api(`exercice/${props.idExercice}`, {
        method: 'POST',
        body: form.value
      })
      emit('create', response)
    }
    emit('close')
  } catch(e) {
    console.error(e)
    if (props.idCard) $notify('error', "Erreur lors de la modification de la carte", e)
    else $notify('error', "Erreur lors de la création de la carte", e)
  } finally {
    loading.value = false
  }
} 

watch(() => props.show, async (value) => {
  if (value) {
    if (props.idCard) {
      form.value = await $api(`exercice/card/${props.idCard}`)
    } else {
      form.value = { ...MODEL_CARD }
    }
  }
})
</script>

<template>
  <Modal :show="props.show" @close="emit('close')">
    <template #header>
      {{ libelleCTA }} une carte
    </template>

    <div class="row my-2">
      <div class="col-12">
        <div class="vstack gap-1">
          <span>Libelle</span>
          <input v-model="form.libelle" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-12">
        <div class="vstack gap-1">
          <span>Texte</span>
          <textarea v-model="form.texte" class="form-control" />
        </div>
      </div>
    </div>

    <template #footer>
      <Button 
        class="btn-umanao" 
        :label="libelleCTA" 
        :disabled="loading" 
        @click="AddorUpdateCard" 
      />
    </template>
  </Modal>
</template>
