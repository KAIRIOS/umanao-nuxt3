<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 vstack gap-2">
        <div class="hstack gap-2">
          <NuxtLink to="/cards" class="btn btn-primary color-black">Voir les cartes</NuxtLink>
          <NuxtLink to="/results" class="btn btn-primary color-black">Voir le résultat</NuxtLink>
        </div>
        <h3 class="m-0">Grille</h3>
        <div class="vstack gap-2">
          <span>
            Ici vous devez estimé l'importance des cartes.
          </span>
          <div class="card">
            <div class="card-body overflow-auto" style="height: 656px !important">
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
      <div class="col-md-10">
        <div class="card">
          <div class="card-body" style="height: 800px !important">
            <VueFlow
              v-model="elements"
              :default-viewport="{ zoom: 1 }"
              :max-zoom="0.75"
              :min-zoom="0.25"
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
              <Controls>
                <ControlButton>
                  <i class="fa fa-plus"></i>
                </ControlButton>
              </Controls>
            </VueFlow>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { VueFlow } from '@vue-flow/core'
import { Controls, ControlButton } from '@vue-flow/controls'
import nuxtStorage from 'nuxt-storage/nuxt-storage'
import draggable from "vuedraggable";
import CustomNode from '~/components/CustomNode.vue'
import nodesTools from '~/tools/nodes.js'


const elements = ref(nodesTools.generate(10, 10, 1))
const cards = ref([]);

function deleteCard(cardFromGrill) {
  cards.value = [...cards.value, ...cardFromGrill]
}

onMounted(() => {
  // On recupère les cartes présente dans le localStorage
  const cardImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardImportant'));
  const cardNoImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardNoImportant'));

  // On récupère les informations du LocalStorage
  if (cardImportantStorage) cards.value = [...cards.value, ...cardImportantStorage]
  if (cardNoImportantStorage)  cards.value = [...cards.value, ...cardNoImportantStorage]
})
</script>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';

/* Import des styles pour les controls */
@import '@vue-flow/controls/dist/style.css';
</style>