<template>
  <file-element />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FileElement from '../../components/FileElement.vue'

export default defineComponent({
  name: 'Files',
  components: {
    FileElement,
  },
  setup() {},
})
</script>

<style lang="scss" scoped></style>
