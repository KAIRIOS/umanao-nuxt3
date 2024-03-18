<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 vstack gap-2">
        <div>
          <NuxtLink to="/grilles" class="btn btn-primary color-black">Voir la grille</NuxtLink>
        </div>
        <h3 class="m-0">Cards</h3>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Etiam at molestie nibh. Nam non dolor eu urna malesuada congue sit amet luctus quam.
          Vivamus vel nibh ac augue porttitor euismod in et libero.
        </span>
      </div>
      <div class="col-md-3">
        <div class="card">
          <h4 class="card-header">Moins important</h4>
          <div class="card-body">
            <draggable
              :list="cardNoImportant"
              tag="div"
              itemKey="id"
              group="cardElement"
              class="vstack gap-3"
            >
              <template #item="{ element, index }">
                <div
                  v-bind:id="element.id"
                  :class="{
                  card: 'card',
                }"
                  v-show="{ index }"
                >
                  <div class="card-body" style="cursor: grab">
                    <h5 class="card-title">{{ element.name }}</h5>
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
      <div class="col-md-3">
        <div class="card">
          <h4 class="card-header">Cartes à organisé</h4>
          <div class="card-body">
            <draggable
              :list="cardsSources"
              tag="div"
              itemKey="id"
              group="cardElement"
              class="vstack gap-3"
              @change="listCardSourceListener"
            >
              <template #item="{ element, index }">
                <div
                  v-bind:id="element.id"
                  :class="{
                  card: 'card',
                }"
                  v-show="{ index }"
                >
                  <div class="card-body" style="cursor: grab">
                    <h5 class="card-title">{{ element.name }}</h5>
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
      <div class="col-md-3">
        <div class="card">
          <h4 class="card-header">Plus important</h4>
          <div class="card-body">
            <draggable
              :list="cardImportant"
              tag="div"
              itemKey="id"
              group="cardElement"
              class="vstack gap-3"
            >
              <template #item="{ element, index }">
                <div
                  v-bind:id="element.id"
                  :class="{
                  card: 'card',
                }"
                  v-show="{ index }"
                >
                  <div class="card-body" style="cursor: grab">
                    <h5 class="card-title">{{ element.name }}</h5>
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
</template>
<script setup lang="ts">
import cardsSource from "../../assets/datas/cards.json";
// import nuxtStorage from 'nuxt-storage/nuxt-storage'
import draggable from "vuedraggable";
//
const previewCardElements = ref("");
const cardChoosen = ref([]);
const cardImportant = ref([]);
const cardNoImportant = ref([]);
const cardsSources = [...cardsSource];

function listCardListener(event) {
  if (event) {
    if (event.added) {
      console.log("CARD HAS BEEN ADDED");
      cardChoosen.value.push(event.added.element);
    }
    if (event.removed) {
      console.log("CARD HAS BEEN REMOVED");
      cardChoosen.value.splice(event.removed.element.id, 1);
    }
  }
}

function listCardSourceListener(event) {
  if (event) {
    if (event.added) {
      console.log("CARD HAS BEEN ADDED");
      cardsSources.push(event.added.element);
    }
    if (event.removed) {
      console.log("CARD HAS BEEN REMOVED");
      console.log(cardsSources.length);
      cardsSources.splice(event.removed.oldIndex, 1);
      console.log(cardsSources.length);
    }
  }
}

watch(cardsSources, (newValue) => {
  console.log("cardsSources");
  console.log(newValue);
});

</script>