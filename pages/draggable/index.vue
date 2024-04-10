<script setup>
import { VueFlow } from '@vue-flow/core'

function generateNodes(x = 10, y = 10) {
  const ret = []
  for (let xi = 0; xi < x; xi++) {
    for (let yi = 0; yi < y; yi++) {
      ret.push({
        id: '' + xi + '-' + yi,
        type: 'special',
        position: {
          x: xi * 162,
          y: yi * 162
        },
        data: {
          x: xi,
          y, yi
        }
      })
    }
  }

  return ret;
}

const elements = ref(generateNodes())

</script>

<template>
  <VueFlow
      style="width: 100vw; height: 100vh"
      v-model="elements"
      :default-viewport="{ zoom: 1 }"
      :max-zoom="400"
      :min-zoom="0.001"
      :nodes-draggable="false"
      :fit-view-on-init="true"
      :zoom-on-double-click="false"
      :capture-zoom-click="false"
      :nodes-connectable="false"
      :elements-selectable="true"
  >
    <!-- bind your custom node type to a component by using slots, slot names are always `node-<type>` -->
    <template #node-special="specialNodeProps">
      <CustomNode v-bind="specialNodeProps" />
    </template>
  </VueFlow>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>