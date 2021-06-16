<template>
  <creator
    v-for="creator in creators"
    v-bind:key="creator"
    :traQID="creator"
  ></creator>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import creator from './creator.vue'

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
    creator,
  },
})
</script>
