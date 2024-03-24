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
                      <h5 class="card-title">{{ element.name }}</h5>
                      <span class="card-text">
                      {{ cutText(element.texte, 50) }}
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
          <div class="card-body overflow-auto" style="height: 800px !important">
            <div class="hstack flex-wrap gap-2">
              <div v-for="grille in grilleSource" :key="grille.id" class="card grid-item" :class="`border-${grille.color}`">
                <div class="card-header">Valeur : {{ grille.value }}</div>
                <div class="card-body">
                  <draggable
                    v-model="grille.data"
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
                          {{ element.name }}
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
</template>
<script setup lang="ts">
import draggable from "vuedraggable";
import nuxtStorage from 'nuxt-storage/nuxt-storage'

const grilleSource = [
  { data: [], value: 1, id: 1, color: 'danger' },
  { data: [], value: 2, id: 2, color: 'danger' },
  { data: [], value: 3, id: 3, color: 'danger' },
  { data: [], value: 4, id: 4, color: 'danger' },
  { data: [], value: 5, id: 5, color: 'danger' },
  { data: [], value: 6, id: 6, color: 'danger' },
  { data: [], value: 7, id: 7, color: 'danger' },
  { data: [], value: 8, id: 8, color: 'danger' },
  { data: [], value: 9, id: 9, color: 'danger' },
  { data: [], value: 10, id: 10, color: 'danger' },
  { data: [], value: 11, id: 11, color: 'danger' },
  { data: [], value: 12, id: 12, color: 'danger' },
  { data: [], value: 13, id: 13, color: 'danger' },
  { data: [], value: 14, id: 14, color: 'danger' },
  { data: [], value: 15, id: 15, color: 'danger' },
  { data: [], value: 16, id: 16, color: 'danger' },
  { data: [], value: 17, id: 17, color: 'danger' },
  { data: [], value: 18, id: 18, color: 'danger' },
  { data: [], value: 19, id: 19, color: 'danger' },
  { data: [], value: 20, id: 20, color: 'danger' },

  { data: [], value: 21, id: 21, color: 'warning' },
  { data: [], value: 22, id: 22, color: 'warning' },
  { data: [], value: 23, id: 23, color: 'warning' },
  { data: [], value: 24, id: 24, color: 'warning' },
  { data: [], value: 25, id: 25, color: 'warning' },
  { data: [], value: 26, id: 26, color: 'warning' },
  { data: [], value: 27, id: 27, color: 'warning' },
  { data: [], value: 28, id: 28, color: 'warning' },
  { data: [], value: 29, id: 29, color: 'warning' },
  { data: [], value: 30, id: 30, color: 'warning' },
  { data: [], value: 31, id: 31, color: 'warning' },
  { data: [], value: 32, id: 32, color: 'warning' },
  { data: [], value: 33, id: 33, color: 'warning' },
  { data: [], value: 34, id: 34, color: 'warning' },
  { data: [], value: 35, id: 35, color: 'warning' },
  { data: [], value: 36, id: 36, color: 'warning' },
  { data: [], value: 37, id: 37, color: 'warning' },
  { data: [], value: 38, id: 38, color: 'warning' },
  { data: [], value: 39, id: 39, color: 'warning' },
  { data: [], value: 40, id: 40, color: 'warning' },

  { data: [], value: 41, id: 41, color: 'primary' },
  { data: [], value: 42, id: 42, color: 'primary' },
  { data: [], value: 43, id: 43, color: 'primary' },
  { data: [], value: 44, id: 44, color: 'primary' },
  { data: [], value: 45, id: 45, color: 'primary' },
  { data: [], value: 46, id: 46, color: 'primary' },
  { data: [], value: 47, id: 47, color: 'primary' },
  { data: [], value: 48, id: 48, color: 'primary' },
  { data: [], value: 49, id: 49, color: 'primary' },
  { data: [], value: 50, id: 50, color: 'primary' },
  { data: [], value: 51, id: 51, color: 'primary' },
  { data: [], value: 52, id: 52, color: 'primary' },
  { data: [], value: 53, id: 53, color: 'primary' },
  { data: [], value: 54, id: 54, color: 'primary' },
  { data: [], value: 55, id: 55, color: 'primary' },
  { data: [], value: 56, id: 56, color: 'primary' },
  { data: [], value: 57, id: 57, color: 'primary' },
  { data: [], value: 58, id: 58, color: 'primary' },
  { data: [], value: 59, id: 59, color: 'primary' },
  { data: [], value: 60, id: 60, color: 'primary' },

  { data: [], value: 61, id: 61, color: 'info' },
  { data: [], value: 62, id: 62, color: 'info' },
  { data: [], value: 63, id: 63, color: 'info' },
  { data: [], value: 64, id: 64, color: 'info' },
  { data: [], value: 65, id: 65, color: 'info' },
  { data: [], value: 66, id: 66, color: 'info' },
  { data: [], value: 67, id: 67, color: 'info' },
  { data: [], value: 68, id: 68, color: 'info' },
  { data: [], value: 69, id: 69, color: 'info' },
  { data: [], value: 70, id: 70, color: 'info' },
  { data: [], value: 71, id: 71, color: 'info' },
  { data: [], value: 72, id: 72, color: 'info' },
  { data: [], value: 73, id: 73, color: 'info' },
  { data: [], value: 74, id: 74, color: 'info' },
  { data: [], value: 75, id: 75, color: 'info' },
  { data: [], value: 76, id: 76, color: 'info' },
  { data: [], value: 77, id: 77, color: 'info' },
  { data: [], value: 78, id: 78, color: 'info' },
  { data: [], value: 79, id: 79, color: 'info' },
  { data: [], value: 80, id: 80, color: 'info' },

  { data: [], value: 81, id: 81, color: 'secondary' },
  { data: [], value: 82, id: 82, color: 'secondary' },
  { data: [], value: 83, id: 83, color: 'secondary' },
  { data: [], value: 84, id: 84, color: 'secondary' },
  { data: [], value: 85, id: 85, color: 'secondary' },
  { data: [], value: 86, id: 86, color: 'secondary' },
  { data: [], value: 87, id: 87, color: 'secondary' },
  { data: [], value: 88, id: 88, color: 'secondary' },
  { data: [], value: 89, id: 89, color: 'secondary' },
  { data: [], value: 90, id: 90, color: 'secondary' },
  { data: [], value: 91, id: 91, color: 'secondary' },
  { data: [], value: 92, id: 92, color: 'secondary' },
  { data: [], value: 93, id: 93, color: 'secondary' },
  { data: [], value: 94, id: 94, color: 'secondary' },
  { data: [], value: 95, id: 95, color: 'secondary' },
  { data: [], value: 96, id: 96, color: 'secondary' },
  { data: [], value: 97, id: 97, color: 'secondary' },
  { data: [], value: 98, id: 98, color: 'secondary' },
  { data: [], value: 99, id: 99, color: 'secondary' },
  { data: [], value: 100, id: 100, color: 'secondary' },
]

const cards = ref([]);

onMounted(() => {
  // On recupère les cartes présente dans le localStorage
  const cardImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardImportant'));
  const cardNoImportantStorage = JSON.parse(nuxtStorage.localStorage.getData('cardNoImportant'));

  // On récupère les informations du LocalStorage
  if (cardImportantStorage) cards.value = [...cards.value, ...cardImportantStorage]
  if (cardNoImportantStorage)  cards.value = [...cards.value, ...cardNoImportantStorage]

  console.log(cards.value)
})

function cutText(value, strLength = 30) {
  if (typeof value !== 'string') return ''
  if (value.length <= strLength) return value

  return value.substring(0, strLength) + (value.length > strLength ? '...' : '')
}

</script>

<style>
.grid-item {
  width: calc(100% * (1/10) - 10px - 1px);
}
</style>