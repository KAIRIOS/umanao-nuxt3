<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 vstack gap-3">
        <div class="hstack gap-2">
          <NuxtLink to="/grilles" class="btn btn-primary color-black">Voir la grille</NuxtLink>
        </div>

        <h3 class="m-0">Répartition des cartes</h3>
        <span>
          Ici vous pouvez organiser les cartes en fonction de leur importance.
        </span>
        <div class="vstack gap-2">
          <div class="hstack gap-2">
            <button class="btn btn-primary" @click="console.log('click Register')">Enregistrer</button>
            <button class="btn btn-danger" @click="console.log('click Reset')">Recommencer</button>
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-3">
            <div class="card">
              <h4 class="card-header">Important</h4>
              <div class="card-body overflow-hidden p-0" style="height: 500px !important;">
                <VueFlow
                  v-model="elementsImportant"
                  :default-viewport="{ zoom: 1 }"
                  :max-zoom="0.75"
                  :min-zoom="0.26"
                  :nodes-draggable="false"
                  :fit-view-on-init="true"
                  :nodes-connectable="false"
                  :zoom-on-double-click="false"
                  :snap-to-grid="true"
                  :elements-selectable="true"
                >
                  <template #node-special="specialNodeProps">
                    <CustomNode v-bind="specialNodeProps" @delete="console.log('Delete Cards')" />
                  </template>
                  <Controls position="bottom-right" :showZoom="false" :showInteractive="false"/>
                </VueFlow>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <h4 class="card-header">Moins important</h4>
              <div class="card-body overflow-hidden" style="height: 500px !important">
                <VueFlow
                  v-model="elementsMoinsImportant"
                  :default-viewport="{ zoom: 1 }"
                  :max-zoom="0.75"
                  :min-zoom="0.26"
                  :nodes-draggable="false"
                  :fit-view-on-init="true"
                  :nodes-connectable="false"
                  :zoom-on-double-click="false"
                  :snap-to-grid="true"
                  :elements-selectable="true"
                >
                  <template #node-special="specialNodeProps">
                    <CustomNode v-bind="specialNodeProps" @delete="console.log('Delete Cards')" />
                  </template>
                  <Controls position="bottom-right" :showZoom="false" :showInteractive="false"/>
                </VueFlow>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <h4 class="card-header">Peu important</h4>
              <div class="card-body overflow-hidden" style="height: 500px !important">
                <VueFlow
                  v-model="elementsPeuImportant"
                  :default-viewport="{ zoom: 1 }"
                  :max-zoom="0.75"
                  :min-zoom="0.26"
                  :nodes-draggable="false"
                  :fit-view-on-init="true"
                  :nodes-connectable="false"
                  :zoom-on-double-click="false"
                  :snap-to-grid="true"
                  :elements-selectable="true"
                >
                  <template #node-special="specialNodeProps">
                    <CustomNode v-bind="specialNodeProps" @delete="console.log('Delete Cards')" />
                  </template>
                  <Controls position="bottom-right" :showZoom="false" :showInteractive="false"/>
                </VueFlow>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <h4 class="card-header">Pas important du tout</h4>
              <div class="card-body overflow-hidden" style="height: 500px !important">
                <VueFlow
                  v-model="elementsPasImportant"
                  :default-viewport="{ zoom: 1 }"
                  :max-zoom="0.75"
                  :min-zoom="0.26"
                  :nodes-draggable="false"
                  :fit-view-on-init="true"
                  :nodes-connectable="false"
                  :zoom-on-double-click="false"
                  :snap-to-grid="true"
                  :elements-selectable="true"
                >
                  <template #node-special="specialNodeProps">
                    <CustomNode v-bind="specialNodeProps" @delete="console.log('Delete Cards')" />
                  </template>
                  <Controls position="bottom-right" :showZoom="false" :showInteractive="false"/>
                </VueFlow>
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
import { ref, onMounted } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import CustomNode from '~/components/CustomNode.vue'
import nodesTools from '~/tools/nodes.js'

const cards = ref([]);
const elementsImportant = ref(nodesTools.generate(5, 5, 1))
const elementsMoinsImportant = ref(nodesTools.generate(5, 5, 26))
const elementsPeuImportant = ref(nodesTools.generate(5, 5, 51))
const elementsPasImportant = ref(nodesTools.generate(5, 5, 76))


onMounted(() => {
  // On recupère les cartes présente dans le localStorage
  const cardImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardImportant'));
  const cardNoImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardNoImportant'));

  // On récupère les informations du LocalStorage
  if (cardImportantStorage) cards.value = [...cards.value, ...cardImportantStorage]
  if (cardNoImportantStorage)  cards.value = [...cards.value, ...cardNoImportantStorage]
})

</script>