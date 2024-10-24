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

const modalCard = ref(false)
const idCard = ref(null)
const cards = ref([])
const modalDelete = ref(false)
const cardForDelete = ref(null)
 
const openModalAddCard = () => {
  idCard.value = null
  modalCard.value = true
}

const openModalEditCard = (cardId) => {
  idCard.value = cardId
  modalCard.value = true
}

const closeModalDelete = async (forDelete = false) => {
  try {
    if (forDelete) {
      await $api(`exercice/card`, {
        method: 'DELETE',
        body: JSON.stringify({ id: cardForDelete.value }),
      })
      cards.value = await $api(`exercice/card`)
    } else {
      cardForDelete.value = null
    }
  } catch (e) {
    if (e.response?._data?.error_description) {
      $notify('error', e.response._data.error_description[0])
    } else {
      $notify('error', "Erreur lors de la suppression de la carte")
    }
    console.log('error', e)
  } finally {
    modalDelete.value = false
  }
}

const addCard = (card) => {
  cards.value.push(card)
}

const editCard = (card) => {
  const index = cards.value.findIndex((c) => c.id === card.id)
  cards.value[index] = card
}

const deleteCard = (cardId) => {
  modalDelete.value = true
  cardForDelete.value = cardId
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
                  <div class="hstack gap-2">
                    <Button class="btn-danger" icon="fas fa-trash" @click="deleteCard(card.id)" />
                    <Button class="btn-umanao" icon="fas fa-edit" @click="openModalEditCard(card.id)" />
                  </div>
                </div>
                <span>{{ card.texte }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal :show="modalDelete" :show-close="true" @close="closeModalDelete(false)">
        <template #header>
          <h5 class="modal-title">Confirmation de suppression</h5>
        </template>
        <div>
          <p>Etes vous sur de vouloir supprimer cette carte ?</p>
        </div>
        <template #footer>
          <Button class="btn-umanao" label="Valider" type="button" data-bs-dismiss="modal" @click="closeModalDelete(true)" />
        </template>
      </Modal>
    </div>
  </Modal>
</template>
