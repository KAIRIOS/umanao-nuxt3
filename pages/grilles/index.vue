<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 vstack gap-2">
        <div>
          <NuxtLink to="/cards" class="btn btn-primary color-black">Voir les cartes</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/results" class="btn btn-primary color-black">Voir le résultat</NuxtLink>
        </div>
        <h3 class="m-0">Grille</h3>
        <div class="vstack gap-2">
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at
            molestie nibh. Nam non dolor eu urna malesuada congue sit amet luctus
            quam. Vivamus vel nibh ac augue porttitor euismod in et libero. Duis
            blandit sit amet magna eu placerat. Vestibulum magna elit, congue sed
            dolor sed, tempor aliquam tortor. Aliquam venenatis augue id efficitur
            ultrices. Phasellus fermentum justo vel mattis auctor.
          </span>
          <h2>Consigne</h2>
          <div class="vstack">
            <span class="text-danger fw-bold">01 À 20 : Important</span>
            <span class="text-warning fw-bold">21 À 65 : Modéré</span>
            <span class="text-primary fw-bold">65 À 100 : Moins important</span>
          </div>
          <div class="card">
            <div class="card-body overflow-auto" style="height: 350px !important">
              <draggable
                v-model="cards"
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
      <div class="col-md-9">
        <div class="card">
          <div class="card-body" style="height: 800px !important">
            <VueFlow
              v-model="elements"
              :default-viewport="{ zoom: 1 }"
              :max-zoom="400"
              :min-zoom="0.001"
              :nodes-draggable="false"
              :fit-view-on-init="true"
              :nodes-connectable="false"
              :zoom-on-double-click="false"
              :snap-to-grid="true"
              :elements-selectable="true"
            >
              <!-- bind your custom node type to a component by using slots, slot names are always `node-<type>` -->
              <template #node-special="specialNodeProps">
                <CustomNode v-bind="specialNodeProps" @delete="deleteCard"/>
              </template>
            </VueFlow>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { VueFlow } from '@vue-flow/core'
import nuxtStorage from 'nuxt-storage/nuxt-storage'
import draggable from "vuedraggable";
import CustomNode from '~/components/CustomNode.vue'

function generateNodes(x = 10, y = 10) {
  const ret = []
  let id = 1;
  for (let yi = 0; yi < y; yi++) {
    for (let xi = 0; xi < x; xi++) {
      ret.push({
        id: '' + xi + '-' + yi,
        type: 'special',
        position: {
          x: xi * 300,
          y: yi * 300,
        },
        data: {
          value: id,
          card: [],
        }
      })
      id++
    }
  }

  return ret;
}

const elements = ref(generateNodes())
const cards = ref([]);

onMounted(() => {
  // On recupère les cartes présente dans le localStorage
  const cardImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardImportant'));
  const cardNoImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardNoImportant'));

  // On récupère les informations du LocalStorage
  if (cardImportantStorage) cards.value = [...cards.value, ...cardImportantStorage]
  if (cardNoImportantStorage)  cards.value = [...cards.value, ...cardNoImportantStorage]
})

function deleteCard(cardFromGrill) {
  console.log('cards')
  cards.value = [...cards.value, ...cardFromGrill]
}
</script>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>