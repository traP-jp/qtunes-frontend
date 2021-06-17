<template>
  <el-scrollbar height="89.5vh">
    <CreatorElement
      v-for="creator in creators"
      :key="creator"
      :traq-id="creator"
    />
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CreatorElement from './CreatorElement.vue'

export default defineComponent({
  name: 'CreatorsList',
  components: {
    CreatorElement,
  },
  setup() {
    const creators: String[] = [
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'itt',
      'SSlime',
      'xxarupakaxx',
      'Ras',
      'kounosuke',
      'takku_bobshiroshiro_titech_trap',
    ]
    return {
      creators,
    }
  },
})
</script>

<style lang="scss" scopped>
</style>