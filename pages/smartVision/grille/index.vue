<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 vstack gap-2">
        <div class="hstack gap-2">
          <NuxtLink to="/smartVision/card" class="btn btn-umanao color-black">Etape 1</NuxtLink>
          <NuxtLink to="/smartVision/card/repartition" class="btn btn-umanao color-black">Etape 2</NuxtLink>
        </div>
        <h3 class="m-0">Consignes</h3>
        <div class="vstack gap-2">
          <span>
            classez les cartes sur l’ensemble de la grille, en vous souvenant que la carte que vous trouvez la plus importante, doit être placée en haut à droite de la grille, celle un peu moins importante juste en dessous, et ainsi de suite. (Consigne sera réécrite, ndlr)
          </span>

          <div class="card card-all-important">
            <div class="card-body overflow-auto">
              <div class="accordion">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Pas important du tout
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
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
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Peu important
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
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
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Moins important
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
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
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                      Important
                    </button>
                  </h2>
                  <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
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
            </div>
          </div>

        </div>
      </div>
      <div class="col-md-10">
        <div class="card">
          <div class="card-body card-matrice">
            <div v-if="cloneCard" class="card opacity-50 position-absolute" style="width: 235px; height: 235px;">
              <div class="card-body border textClass">
                <div class="card-text">
                  {{ cloneCard[0].texte }}
                </div>
              </div>
            </div>
            <VueFlow
              ref="flow"
              v-model="elements"
              :default-viewport="{ zoom: 1 }"
              :max-zoom="0.85"
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
                <CustomNode v-bind="specialNodeProps" @delete="deleteCard" @click="handleNodeClick($event)"/>
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

definePageMeta({
  name: 'grille',
  middleware: 'auth'
})

import { VueFlow } from '@vue-flow/core'
import { Controls, ControlButton } from '@vue-flow/controls'
import nuxtStorage from 'nuxt-storage/nuxt-storage'
import draggable from "vuedraggable";
import CustomNode from '~/components/CustomNode.vue'
import nodesTools from '~/tools/nodes.js'
import { ref } from 'vue'

const elements = ref(nodesTools.generate(10, 10, 1))
const idLastReposition = ref(null);

const cardsPasImportant = ref([]);
const cardsPeuImportant = ref([]);
const cardsMoinsImportant = ref([]);
const cardsVeryImportant = ref([]);

let cloneCard = ref(null)
const flow = ref(null)

function handleNodeClick({ parent }) {
  // On récupère tous les nodes de la grille
  const allNodes = flow.value?.nodes
  if (!allNodes) return
  // On récupère l'id du node parent
  const idNode = parent.attributes.id.value
  if (!idNode) return
  // On récupère les données du node cliqué
  const nodeSelected = allNodes.find((node) => node.id === idNode)
  const dataCardNodeSelected = nodeSelected.data.card

  deleteCard(dataCardNodeSelected)
  nodeSelected.data.card = []

  // if (!cloneCard.value && !dataCardNodeSelected.length) return
  // if (cloneCard.value && dataCardNodeSelected.length) return
  //
  // if (!cloneCard.value && dataCardNodeSelected.length) {
  //   cloneCard.value = dataCardNodeSelected
  //   nodeSelected.data.card = []
  //   return
  // }
  //
  // if (cloneCard.value && !dataCardNodeSelected.length) {
  //   nodeSelected.data.card.push(cloneCard.value[0])
  //   cloneCard.value = null
  //   return
  // }
}

function deleteCard(cardFromGrill) {
  const card = [...cardFromGrill][0]
  idLastReposition.value = card.id

  // On récupère les cartes présente dans le localStorage
  const cards = JSON.parse(nuxtStorage.localStorage.getData('cards'));

  const cardsPasImportantLocal = cards.cardsPasImportant;
  const cardsPeuImportantLocal = cards.cardsPeuImportant;
  const cardsMoinsImportantLocal = cards.cardsMoinsImportant;
  const cardsVeryImportantLocal = cards.cardsVeryImportant;

  // On cherche dans quel tableau se trouve la carte
  const indexPasImportant = cardsPasImportantLocal.findIndex((element) => element.id === card.id)
  if (indexPasImportant !== -1) {
    cardsPasImportant.value.unshift(card)
    return
  }
  const indexPeuImportant = cardsPeuImportantLocal.findIndex((element) => element.id === card.id)
  if (indexPeuImportant !== -1) {
    cardsPeuImportant.value.unshift(card)
    return
  }
  const indexMoinsImportant = cardsMoinsImportantLocal.findIndex((element) => element.id === card.id)
  if (indexMoinsImportant !== -1) {
    cardsMoinsImportant.value.unshift(card)
    return
  }
  const indexVeryImportant = cardsVeryImportantLocal.findIndex((element) => element.id === card.id)
  if (indexVeryImportant !== -1) {
    cardsVeryImportant.value.unshift(card)
    return
  }
}

onMounted(() => {
  // On recupère les cartes présente dans le localStorage
  const cards = JSON.parse(nuxtStorage.localStorage.getData('cards'));
  if (cards) {
    cardsPasImportant.value = cards.cardsPasImportant;
    cardsPeuImportant.value = cards.cardsPeuImportant;
    cardsMoinsImportant.value = cards.cardsMoinsImportant;
    cardsVeryImportant.value = cards.cardsVeryImportant;
  }
})
</script>

<style>
/* import the necessary styles for Vue Flow to work */
@import '../../../node_modules/@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '../../../node_modules/@vue-flow/core/dist/theme-default.css';

/* Import des styles pour les controls */
@import '../../../node_modules/@vue-flow/controls/dist/style.css';
.textClass {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  overflow: hidden;
}
</style>