<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 vstack gap-2">
        <div>
          <NuxtLink to="/grilles" class="btn btn-primary color-black">Voir la grille</NuxtLink>
        </div>
        <h3 class="m-0">Cards</h3>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Etiam at molestie nibh. Nam non dolor eu urna malesuada congue sit amet luctus quam.
          Vivamus vel nibh ac augue porttitor euismod in et libero.
        </span>
        <div class="vstack gap-2">
          <div>
            <button class="btn btn-primary" @click="registerCard">Enregistrer</button>
          </div>
          <div>
            <button class="btn btn-danger" @click="resetCards">Recommencer</button>
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
          <div class="card-body overflow-auto" style="max-height: 800px !important">
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
                    <h5 class="card-title">{{ element.name }}</h5>
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
          <h4 class="card-header">Cartes à organisé</h4>
          <div class="card-body overflow-auto" style="max-height: 800px !important">
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
                    <h5 class="card-title">Card name: {{ element.name }}</h5>
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
          <div class="card-body overflow-auto" style="max-height: 800px !important">
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
                    <h5 class="card-title">{{ element.name }}</h5>
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
import cardsSource from "../../assets/datas/cards.json";
import draggable from "vuedraggable";
import nuxtStorage from 'nuxt-storage/nuxt-storage'

const cardImportant = ref([]);
const cardNoImportant = ref([]);
const cardsSources = ref([...cardsSource]);
const error = ref('');
const save = ref('');

onMounted(() => {
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

// Permet de supprimer les cartes présentes dans le localStorage
function deleteCardFromStorage(cardsStorage, cardsSources) {
  cardsStorage.forEach((card) => {
    const index = cardsSources.value.findIndex((c) => c.id === card.id);
    if (index !== -1) cardsSources.value.splice(index, 1);
  });
}

function registerCard() {
  // S'il nous reste des cartes a organiser, on met un message d'erreur
  if (cardsSources.value.length > 0) {
    error.value = "Il vous reste des cartes à organiser"
    return
  }
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
  cardsSources.value = [...cardsSource]
  // On delete les cartes dans le localStorage
  nuxtStorage.localStorage.removeItem('cardImportant')
  nuxtStorage.localStorage.removeItem('cardNoImportant')
}

</script>