<script setup>
import { ref } from 'vue'

const props = defineProps(['data'])

console.log(props)

</script>

<template>
  <div class="custom-node-container">
    <div>X: {{ props.data.x }}</div>
    <div>Y: {{ props.data.y }}</div>
  </div>
</template>

<style scoped>
.custom-node-container {
  background-color: red;
  border: 1px solid black;
  width: 10rem;
  height: 10rem;
}
</style>