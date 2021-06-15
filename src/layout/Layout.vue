<template>
  <div id="app">
    <el-container class="layout-container">
      <el-header class="header-container"> header </el-header>
      <el-container>
        <el-aside> aside </el-aside>
        <el-main class="main-content">
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Layout',
  components: {},
  setup() {},
})
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  width: 100vw;
  .header-container {
    background-color: #eee;
  }
  .main-content {
    background-color: #ee9;
  }
}
</style>
