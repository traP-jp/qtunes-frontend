<template>
  <div id="app">
    <el-container class="layout-container">
      <layout-header />
      <!-- <el-header class="header-container"> header </el-header> -->
      <el-container>
        <el-aside> aside </el-aside>
        <el-main class="main-content">
          <slot />
        </el-main>
      </el-container>
      <el-footer class="fixed-footer" height="auto">
        <LayoutPlayer id="" />
      </el-footer>
      <!-- <el-footer>footer</el-footer> -->
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutHeader from './component/LayoutHeader.vue'
import LayoutPlayer from './component/LayoutPlayer.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutPlayer,
  },
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

.fixed-footer {
  position: fixed;
  bottom: 0;
  // height: auto;
  width: 100vw;
  background-color: white;
}
</style>
