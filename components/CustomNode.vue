<script setup>
import draggable from "vuedraggable";

const emit = defineEmits(['delete', 'click'])
const props = defineProps(['data'])
const parentOfDrag = ref(null)

function cutText(value, strLength = 30) {
  if (typeof value !== 'string') return ''
  if (value.length <= strLength) return value

  return value.substring(0, strLength) + (value.length > strLength ? '...' : '')
}

function handleClick() {
  // On stop le click d'event pour ne pas déclencher le click de draggable
  emit('click', {
    parent: parentOfDrag.value,
  })
}

</script>

<template>
  <div ref="parentOfDrag" class="custom-node-container vstack justify-content-between gap-2">
    <draggable
      v-model="props.data.card"
      tag="div"
      itemKey="id"
      group="cardElement"
      class="vstack gap-3"
      @click.stop="handleClick"
    >
      <template #item="{ element, index }">
        <div
          :ref="`card-${element.id}`"
          v-bind:id="element.id"
          :class="{ card: 'card' }"
          v-show="{ index }"
        >
          <div class="card-body border textClass" style="height: 235px;">
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
.textClass {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  overflow: hidden;
}
</style>