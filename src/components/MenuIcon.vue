<template>
  <el-menu-item :index="`${index}`" :route="`{name: ${routeName}}`">
    <el-tooltip
      effect="dark"
      placement="bottom"
      :content="`${message}`"
      :show-after="100"
    >
      <i :class="`${icon}`" />
    </el-tooltip>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuIcon',
  props: {
    message: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    routeName: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup() {},
})
</script>
