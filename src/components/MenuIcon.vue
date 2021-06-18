<template>
  <el-tooltip effect="dark" placement="bottom" :content="`${msg}`">
    <i :class="`${icon}`" />
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuIcon',
  props: {
    msg: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  setup() {},
})
</script>
