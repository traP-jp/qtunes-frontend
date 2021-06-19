<template>
  <el-menu-item :index="`${ind}`" router="true" :route="`${link}`">
    <el-tooltip
      effect="dark"
      placement="bottom"
      :content="`${msg}`"
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
    msg: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    ind: {
      type: Number,
      required: true,
    },
  },
  setup() {},
})
</script>
