<template>
  <div>This is Top</div>
  <aaaaalist />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import aaaaalist from '../components/aaaaalist.vue'

export default defineComponent({
  name: 'Top',
  components: {
    aaaaalist,
  },
  setup() {},
})
</script>

<style lang="scss" scoped></style>
