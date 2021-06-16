<template>
  <div id="app">
    <el-container class="layout-container">
      <layout-header />
      <!-- <el-header class="header-container"> header </el-header> -->
      <el-container>
        <el-aside>
          <div>aside</div>
          <div>
            <creatorslist />
          </div>
        </el-aside>
        <el-main class="main-content">
          <slot />
        </el-main>
      </el-container>
      <el-footer>footer</el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import creatorslist from '../components/creatorslist.vue'
import LayoutHeader from './component/LayoutHeader.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    creatorslist,
    LayoutHeader,
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
</style>
