<template>
  <Creator
    v-for="creator in creators"
    v-bind:key="creator"
    :traQID="creator"
  ></Creator>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Creator from './Creator.vue'

export default defineComponent({
  setup() {
    const creators: String[] = [
      'itt',
      'SSlime',
      'xxarupakaxx',
      'Ras',
      'kounosuke',
    ]
    return {
      creators,
    }
  },
  components: {
    Creator,
  },
})
</script>
