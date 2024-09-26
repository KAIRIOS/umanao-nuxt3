<script setup lang="ts">
import Modal from '~/components/Ui/Modal.vue'

const props = defineProps<{
  show: Boolean
  idSociety?: Number
}>()

const MODEL_SOCIETY = {
  id: null,
  name: null,
  siret: null,
  adresse: null,
  zipCode: null,
  city: null,
  exercices: [],
}

const emit = defineEmits(['close', 'created'])

const form = ref({})
const exercicesSelected = ref([])
const exercices = ref([])
const { $api } = useNuxtApp();

watch(() => props.show, async (value) => {
  if (value && props.idSociety) {
    await getSociety(props.idSociety)
  } else {
    form.value = { ...MODEL_SOCIETY }
  }
  exercices.value = await $api('exercice')
})

const getSociety = async (idSociety) => {
  form.value = await $api(`society/${idSociety}`)
  form.value.exercices.forEach((exercice) => {
    exercicesSelected.value.push(exercice.id)
  })
}

const AddOrEditSociety = async () => {
  // Faire code d'ajout
  try {
    if (!form.value.name) return

    if (props.idSociety) {
      await $api(`society/${props.idSociety}`, {
        method: 'PUT',
        body: form.value,
      })
      emit('updated')
    } else {
      await $api('society', {
        method: 'POST',
        body: form.value,
      })
      emit('created')
    }
    emit('close')
  } catch (e) {
    console.log('error', 'Erreur lors de la création de la société', e)
  }
}

</script>

<template>
  <div>
    <Modal :show="props.show" @close="emit('close')">
      <template #header>
        {{ props.idSociety ? 'Modifier' : 'Ajouter'}} une société
      </template>

      <div class="row">
        <div class="col-6 mb-2">
          <div class="vstack gap-2">
            <label for="name">Nom de la société</label>
            <input v-model="form.name" class="form-control" type="text" id="name" />
          </div>
        </div>
        <div class="col-6 mb-2">
          <div class="vstack gap-2">
            <label for="siret">Numéro de SIRET</label>
            <input v-model="form.siret" class="form-control" type="text" id="siret" />
          </div>
        </div>
        <div class="col-6 mb-2">
          <div class="vstack gap-2">
            <label for="adresse">Adresse</label>
            <input v-model="form.adresse" class="form-control" type="text" id="adresse" />
          </div>
        </div>
        <div class="col-6 mb-2">
          <div class="vstack gap-2">
            <label for="zipCode">Code postal</label>
            <input v-model="form.zipCode" class="form-control" type="text" id="zipCode" />
          </div>
        </div>
        <div class="col-6 mb-2">
          <div class="vstack gap-2">
            <label for="ville">Ville</label>
            <input v-model="form.city" class="form-control" type="text" id="ville" />
          </div>
        </div>
        <div class="mb-2">
          <div class="vstack gap-1">
            <span>Exercices</span>
            <select v-model="form.exercices" class="form-select" multiple>
              <option v-for="exercice in exercices" :value="exercice.id" :selected="exercicesSelected.includes(exercice.id)">
                {{ exercice.libelle }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <template #footer>
        <button
          class="btn btn-umanao"
          @click="AddOrEditSociety"
          data-bs-dismiss="modal"
          :disabled="!form.name"
        >
          {{ props.idSociety ? 'Modifier' : 'Ajouter' }}
        </button>
      </template>
    </Modal>
  </div>
</template>
