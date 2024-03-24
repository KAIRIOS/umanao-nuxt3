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
        </div>
      </div>
      <div class="col-md-9">
        <div class="card">
          <div class="card-body" style="height: 800px !important">
            Test
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
