<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 vstack gap-3">
        <div class="hstack gap-2">
          <NuxtLink to="/cards" class="btn btn-umanao color-black">Etape 1</NuxtLink>
          <NuxtLink to="/grilles" class="btn btn-umanao color-black">Etape 3</NuxtLink>
        </div>

        <h3 class="m-0">Consignes</h3>
        <span>Répartissez le tas de cartes de l’étape 1 en 2 sous tas :</span>
        <span>1: Le tas de cartes « plutôt moins important » en 2 sous tas (formulation sera revue, ndlr)  « -- » et «-» </span>
        <span>1: Le tas de cartes « plutôt plus important » en 2 sous tas « + » et «++»  </span>
        <div class="vstack gap-2">
          <div class="hstack gap-2">
            <button class="btn btn-umanao" @click="registerCard">Enregistrer</button>
            <button class="btn btn-umanao-cancel" @click="resetCards">Recommencer</button>
          </div>
          <div v-if="save.length > 0" class="col-md-9 alert alert-success w-100">
            {{ save }}
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-3">
            <div class="card">
              <h4 class="card-header">Pas important</h4>
              <div class="card-body overflow-auto card-no-important">
                <draggable
                  v-model="cardsPasImportant"
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
              <h4 class="card-header">Peu important</h4>
              <div class="card-body overflow-auto card-little-important">
                <draggable
                  v-model="cardsMoinsImportant"
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
              <h4 class="card-header">Plutôt important</h4>
              <div class="card-body overflow-auto card-can-important">
                <draggable
                  v-model="cardsPeuImportant"
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
              <h4 class="card-header">Très important</h4>
              <div class="card-body overflow-auto card-very-important">
                <draggable
                  v-model="cardsVeryImportant"
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
        <div class="row mt-3">
          <div class="col-md-6">
            <div class="card">
              <h4 class="card-header">Pas important</h4>
              <div class="card-body overflow-auto card-not-important">
                <draggable
                  v-model="cardsNoImportant"
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
          <div class="col-md-6">
            <div class="card">
              <h4 class="card-header">Important</h4>
              <div class="card-body overflow-auto card-important">
                <draggable
                  v-model="cardsImportant"
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
    </div>
  </div>
</template>
<script setup lang="ts">
import nuxtStorage from 'nuxt-storage/nuxt-storage'
import draggable from "vuedraggable";
import { ref } from 'vue'
import cardsSource from 'assets/datas/cards.json'

const cardsImportant = ref([]);
const cardsNoImportant = ref([]);

const cardsPasImportant = ref([]);
const cardsPeuImportant = ref([]);
const cardsMoinsImportant = ref([]);
const cardsVeryImportant = ref([]);

const save = ref('');

onMounted(() => {
  // On recupère les cartes présente dans le localStorage
  const cardImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardImportant'));
  const cardNoImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardNoImportant'));

  // On récupère les informations du LocalStorage
  if (cardImportantStorage) cardsImportant.value = [...cardImportantStorage]
  if (cardNoImportantStorage)  cardsNoImportant.value = [...cardNoImportantStorage]
})

function registerCard() {
  const cards = {
    cardsPasImportant: [...cardsPasImportant.value],
    cardsPeuImportant: [...cardsPeuImportant.value],
    cardsMoinsImportant: [...cardsMoinsImportant.value],
    cardsVeryImportant: [...cardsVeryImportant.value]
}

  // On save dans le localStorage les cartes dans les différentes listes
  nuxtStorage.localStorage.setData('cards', JSON.stringify(cards), 4, 'h')
  save.value = 'Les cartes ont été enregistrées avec succès'
  setTimeout(() => {
    save.value = ''
  }, 1000)
}

function resetCards() {
  // On reset les cartes dans les différentes listes
  cardsPasImportant.value = []
  cardsPeuImportant.value = []
  cardsMoinsImportant.value = []
  cardsVeryImportant.value = []

  // On delete les cartes dans le localStorage
  nuxtStorage.localStorage.removeItem('cards')

  // On récupère les données dans le localstorage pour les remettre dans les listes
  const cardImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardImportant'));
  const cardNoImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardNoImportant'));

  // On récupère les informations du LocalStorage
  if (cardImportantStorage) cardsImportant.value = [...cardImportantStorage]
  if (cardNoImportantStorage)  cardsNoImportant.value = [...cardNoImportantStorage]
}

</script>