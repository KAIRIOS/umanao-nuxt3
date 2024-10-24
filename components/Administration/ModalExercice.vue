<script setup lang="ts">
import Modal from '~/components/Ui/Modal.vue'
import Button from '~/components/Ui/Button.vue';

const props = defineProps<{
  show: Boolean
  idExercice: Number
  libelleExercice: String
}>()

const { $api, $notify } = useNuxtApp();
const emit = defineEmits(['close'])

const form = ref({})
const modalCard = ref(false)
const idCard = ref(null)
const cards = ref([])
 
const openModalAddCard = () => {
  idCard.value = null
  modalCard.value = true
}

const openModalEditCard = (cardId) => {
  idCard.value = cardId
  modalCard.value = true
}

const addCard = (card) => {
  cards.value.push(card)
}

const editCard = (card) => {
  const index = cards.value.findIndex((c) => c.id === card.id)
  cards.value[index] = card
}

watch(() => props.show, async (value) => {
  if (value) {
    cards.value = await $api(`exercice/card`)
  }
})
</script>

<template>
  <Modal :show="props.show" large @close="emit('close')">
    <template #header>
      {{ props.libelleExercice }}
    </template>

    <div class="row">
      <div class="col-12 mb-3">
        <Button 
          class="btn-umanao float-end" 
          label="Ajouter une carte" 
          icon="fas fa-add" 
          @click="openModalAddCard" 
        />
      </div>

      <AdministrationModalCard
        :show="modalCard"
        :id-exercice="idExercice"
        :id-card="idCard"
        @close="modalCard = false"
        @create="addCard"
        @edit="editCard"
      />

      <div class="col-12">
        <div class="card">
          <h4 class="card-header">Cartes</h4>
          <div class="card-body overflow-auto">
            <div class="vstack gap-2">
              <div v-for="card in cards" :key="card.id" class="card p-2 mb-2">
                <div class="hstack justify-content-between">
                  <h5>{{ card.libelle }}</h5>
                  <Button class="btn-umanao" icon="fas fa-edit" @click="openModalEditCard(card.id)" />
                </div>
                <span>{{ card.texte }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
