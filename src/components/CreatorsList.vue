<template>
  <el-scrollbar>
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
      'SSlime',
      'xxarupakaxx',
      'Ras',
      'kounosuke',
      'takku_bobshiroshiro_titech_trap',
      'Ras',
      'kounosuke',
      'takku_bobshiroshiro_titech_trap',
      'Ras',
      'kounosuke',
      'takku_bobshiroshiro_titech_trap',
      'Ras',
      'kounosuke',
      'takku_bobshiroshiro_titech_trap',
      'Ras',
      'kounosuke',
      'takku_bobshiroshiro_titech_trap',
      'Ras',
      'kounosuke',
      'takku_bobshiroshiro_titech_trap',
      'Ras',
      'kounosuke',
      'takku_bobshiroshiro_titech_trap',
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

<style lang="scss" scopped></style>
