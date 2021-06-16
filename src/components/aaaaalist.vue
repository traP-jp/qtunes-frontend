<template>
  <aaaaa v-for="creator from creators" :traQID="creator"></aaaaa>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import aaaaa from './aaaaa.vue'

export default defineComponent({
  setup() {
    const creators = ['a', 'b', 'c']
  },
  components: {
    aaaaa,
  },
})
</script>
