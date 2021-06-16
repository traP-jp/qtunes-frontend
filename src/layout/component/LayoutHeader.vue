<template>
  <el-header class="header-container">
    <div class="left-content">header</div>
    <div class="right-content">menu</div>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutHeader',
  setup() {},
})
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  .left-content {
    margin-left: 0;
    display: inline-block;
  }
  .right-content {
    margin: {
      left: auto;
      right: 0;
    }
    display: inline-block;
  }
}
</style>
