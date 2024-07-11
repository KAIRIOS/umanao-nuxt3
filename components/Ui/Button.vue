<script setup lang="ts">

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const { label, type, small } = withDefaults(defineProps<{
  label?: string,
  type?: string,
  link?: string,
  icon?: array,
  iconRight?: boolean,
  small?: boolean,
}>(), {
  label: '',
  type: 'button',
  iconRight: false,
  small: false,
})
const emit = defineEmits(['click'])
</script>

<template>
  <NuxtLink
    v-if="link"
    :to="link"
    class="btn"
    :class="{ 'btn-sm': small }"
    @click="emit('click')"
  >
    <div class="hstack gap-2">
      <span v-if="icon" style="width: 1rem" class="iconClass" :class="{ 'order-1': iconRight }">
        <font-awesome-icon v-if="icon" :icon="icon" />
      </span>
      <span v-if="label">{{ label }}</span>
    </div>
  </NuxtLink>
  <button
    v-else
    class="btn"
    :class="{ 'btn-sm': small }"
    :type="type"
    @click="emit('click')"
  >
    <div class="hstack gap-2">
      <span v-if="icon" class="iconClass" :class="{ 'order-1': iconRight }">
        <font-awesome-icon v-if="icon" :icon="icon" />
      </span>
      <span v-if="label">{{ label }}</span>
      <slot />
    </div>
  </button>
</template>

<style lang="scss">
.btn:not(.btn-sm) span.iconClass {
  line-height: initial;
  width: 1rem;
}

.btn-sm span.iconClass {
  width: 0.85rem;
}

</style>