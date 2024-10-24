<script setup>
import draggable from "vuedraggable";

const emit = defineEmits(['click', 'added'])
const props = defineProps(['data'])
const parentOfDrag = ref(null)

function handleChange(event) {
  if (event?.added) {
    emit('added', {value: props.data.value, card: event.added.element})
  }
}

function handleClick() {
  emit('click', {
    parent: parentOfDrag.value,
  })
}

</script>

<template> 
  <div ref="parentOfDrag" class="vstack justify-content-between gap-2 custom-node-container">
    <draggable
      v-model="props.data.card"
      tag="div"
      itemKey="id"
      group="cardElement"
      class="vstack gap-3"
      @change="handleChange"
      @click.stop="handleClick"
    >
      <template #item="{ element, index }">
        <div
          :ref="`card-${element.id}`"
          v-bind:id="element.id"
          :class="{ card: 'card' }"
          v-show="{ index }"
        >
          <div class="card-body border text-class" style="height: 235px;">
            <div class="card-text">
              {{ element.texte }}
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.custom-node-container {
  border: 1px solid black;
  padding: 5px;
  width: 250px;
  height: 250px;
}
.text-class {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  overflow: hidden;
}
</style>