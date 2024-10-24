<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 vstack gap-3">
        <div class="hstack gap-2">
          <NuxtLink to="/smartVision/card/repartition" class="btn btn-umanao color-black">Etape 2</NuxtLink>
          <NuxtLink to="/smartVision/grille" class="btn btn-umanao color-black">Etape 3</NuxtLink>
        </div>

        <h3 class="m-0">Consignes</h3>
        <span>
          mettre chaque carte de la colonne de gauche à l’écran sur une des 2 zones selon que vous estimez le contenu de la carte plutôt moins important ou plutôt plus important
        </span>
        <div class="vstack gap-2">
          <div class="hstack gap-2">
            <button class="btn btn-umanao" @click="registerCard">Enregistrer</button>
            <button class="btn btn-umanao-cancel" @click="resetCards">Recommencer</button>
          </div>
          <div v-if="error.length > 0" class="col-md-9 alert alert-danger w-100">
            {{ error }}
          </div>
          <div v-if="save.length > 0" class="col-md-9 alert alert-success w-100">
            {{ save }}
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <h4 class="card-header">Moins important</h4>
          <div class="card-body overflow-auto card-less-important">
            <draggable
              v-model="cardNoImportant"
              tag="div"
              itemKey="id"
              group="cardElement"
              class="vstack gap-3"
            >
              <template #item="{ element, index }">
                <div
                  v-bind:id="element.id"
                  class="card"
                  v-show="{ index }"
                >
                  <div class="card-body" style="cursor: grab">
                    <span class="card-text">
                      {{ element.texte }}
                    </span>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <h4 class="card-header">Cartes à trier</h4>
          <div class="card-body overflow-auto card-tri">
            <draggable
              v-model="cardsSources"
              tag="div"
              itemKey="id"
              group="cardElement"
              class="vstack gap-3"
            >
              <template #item="{ element, index }">
                <div
                  v-bind:id="element.id"
                  :class="{ card: 'card' }"
                  v-show="{ index }"
                >
                  <div class="card-body" style="cursor: grab">
                    <span class="card-text">
                      {{ element.texte }}
                    </span>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <h4 class="card-header">Plus important</h4>
          <div class="card-body overflow-auto card-more-important" >
            <draggable
              :list="cardImportant"
              tag="div"
              itemKey="id"
              group="cardElement"
              class="vstack gap-3"
            >
              <template #item="{ element, index }">
                <div
                  v-bind:id="element.id"
                  :class="{ card: 'card' }"
                  v-show="{ index }"
                >
                  <div class="card-body" style="cursor: grab">
                    <span class="card-text">
                      {{ element.texte }}
                    </span>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'card',
  middleware: 'auth'
})

import draggable from "vuedraggable";
import nuxtStorage from 'nuxt-storage/nuxt-storage'

const { $api, $notify } = useNuxtApp();
const cardImportant = ref([]);
const cardNoImportant = ref([]);
const cardsSources = ref([]);
const error = ref('');
const save = ref('');

onMounted(() => {
  getCardsSource();

  // On recupère les cartes présente dans le localStorage
  const cardImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardImportant'));
  const cardNoImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardNoImportant'));

  // Si des données sont présentent alors on les supprime de la listes sources
  // On on les ajoutes au listes correspondantes
  if (cardImportantStorage) {
    deleteCardFromStorage(cardImportantStorage, cardsSources)
    cardImportant.value = cardImportantStorage
  }
  if (cardNoImportantStorage) {
    deleteCardFromStorage(cardNoImportantStorage, cardsSources)
    cardNoImportant.value = cardNoImportantStorage
  }
})

const getCardsSource = async () => {
  try {
    cardsSources.value = []
    cardsSources.value = await $api('exercice/card')
  } catch (e) {
    $notify('error', 'Erreur lors de la récuprération des cartes.')
  }
}

// Permet de supprimer les cartes présentes dans le localStorage
function deleteCardFromStorage(cardsStorage, cardsSources) {
  cardsStorage.forEach((card) => {
    const index = cardsSources.value.findIndex((c) => c.id === card.id);
    if (index !== -1) cardsSources.value.splice(index, 1);
  });
}

function registerCard() {
  // S'il nous reste des cartes a organiser, on met un message d'erreur
  // TODO: A remettre quand valider par le client
  // if (cardsSources.value.length > 0) {
  //   error.value = "Il vous reste des cartes à organiser"
  //   return
  // }
  error.value = ''
  // On save dans le localStorage les cartes dans les différentes listes
  nuxtStorage.localStorage.setData('cardImportant', JSON.stringify(cardImportant.value), 4, 'h')
  nuxtStorage.localStorage.setData('cardNoImportant', JSON.stringify(cardNoImportant.value), 4, 'h')
  save.value = 'Les cartes ont été enregistrées avec succès'
  setTimeout(() => {
    save.value = ''
  }, 1000)
}

function resetCards() {
  // On reset les cartes dans les différentes listes
  cardImportant.value = []
  cardNoImportant.value = []
  getCardsSource();
  // On delete les cartes dans le localStorage
  nuxtStorage.localStorage.removeItem('cardImportant')
  nuxtStorage.localStorage.removeItem('cardNoImportant')
}

</script>