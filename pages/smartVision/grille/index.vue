<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 vstack gap-2">
        <div class="hstack gap-2">
          <NuxtLink to="/smartVision/card" class="btn btn-umanao color-black">Etape 1</NuxtLink>
          <NuxtLink to="/smartVision/card/repartition" class="btn btn-umanao color-black">Etape 2</NuxtLink>
          <Button class="btn btn-umanao color-black" :disabled="loading || nbCardForSave > 0" @click="saveResult">Terminer</Button>
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
                <CustomNode v-bind="specialNodeProps" @added="handleAdd" @click="handleNodeClick($event)" @delete="deleteCard" />
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

import Button from '~/components/Ui/Button.vue'
import { VueFlow } from '@vue-flow/core'
import { Controls, ControlButton } from '@vue-flow/controls'
import nuxtStorage from 'nuxt-storage/nuxt-storage'
import draggable from "vuedraggable";
import CustomNode from '~/components/CustomNode.vue'
import nodesTools from '~/tools/nodes.js'
import { ref } from 'vue'

const { $api, $notify } = useNuxtApp();
const elements = ref(nodesTools.generate(10, 0, 1))

const loading = ref(false)
const idLastReposition = ref(null);
const cardsPasImportant = ref([]);
const cardsPeuImportant = ref([]);
const cardsMoinsImportant = ref([]);
const cardsVeryImportant = ref([]);
const cardForResult = ref([])
const nbCardForSave = computed({
  get() {
    return cardsPasImportant.value.length + cardsPeuImportant.value.length + cardsMoinsImportant.value.length + cardsVeryImportant.value.length
  },
  set(value) {
    console.log('change value => ', value)
  }
})

let cloneCard = ref(null)
const flow = ref(null)

function handleAdd(event) {
  cardForResult.value.push(event)
}

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

  // On delete la card du résult
  const indexForResult = cardForResult.value.findIndex((cr) => cr.card.id === dataCardNodeSelected[0].id)
  cardForResult.value.splice(indexForResult, 1)

  nodeSelected.data.card = []
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

const saveResult = async () => {
  try {
    loading.value = true
    await $api('exercice/result', {
      method: 'POST',
      body: cardForResult.value,
    })
  } catch(e) {
    if (e.response?._data?.error_description) {
      $notify('error', e.response._data.error_description)
      if (e?.response?.status === 403) navigateTo('/')
    } else {
      $notify('error', 'Erreur lors de la sauvegarde du résultat')
    }
  } finally {
    loading.value = false
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