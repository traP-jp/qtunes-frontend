<template>
  <el-menu-item :index="index" :route="{ name: route }">
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
    route: {
      type: String,
      required: true,
    },
    index: {
      type: String,
      required: true,
    }
  },
  setup() {},
})
</script>
