<script setup>
import draggable from "vuedraggable";

const emit = defineEmits(['delete'])
const props = defineProps(['data'])

function cutText(value, strLength = 30) {
  if (typeof value !== 'string') return ''
  if (value.length <= strLength) return value

  return value.substring(0, strLength) + (value.length > strLength ? '...' : '')
}

function handleDelete() {
  emit('delete', props.data.card)
  props.data.card = []
}

</script>

<template>
  <div class="custom-node-container vstack justify-content-between gap-2">
      <draggable
        v-model="props.data.card"
        tag="div"
        itemKey="id"
        group="cardElement"
        class="vstack gap-3"
        :disabled="props.data.card.length === 1"
      >
        <template #item="{ element, index }">
          <div
            v-bind:id="element.id"
            :class="{ card: 'card' }"
            v-show="{ index }"
          >
            <div class="card-body border textClass" style="height: 186px;">
              <div class="card-text">
                {{ element.texte }}
              </div>
            </div>
          </div>
        </template>
      </draggable>
      <button v-if="props.data.card.length" @click="handleDelete" class="btn btn-outline-secondary">Repositionner</button>
  </div>
</template>

<style scoped>
.custom-node-container {
  border: 1px solid black;
  padding: 5px;
  width: 250px;
  height: 250px;
}
.textClass {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  overflow: hidden;
}
</style>