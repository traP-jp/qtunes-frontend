<template>
  <el-tooltip effect="dark" placement="bottom" content="aaa">
    <div :class="`el-icon-platform-eleme`" />
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuIcon',
  props: {
    // name: {
    //   type: String,
    //   required: true,
    // },
    // icon: {
    //   type: String,
    //   required: true,
    // },
  },
  setup() {},
})
</script>
