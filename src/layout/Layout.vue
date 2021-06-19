<template>
  <div id="app">
    <el-container class="layout-container">
      <LayoutHeader />
      <!-- <el-header class="header-container"> header </el-header> -->
      <el-container>
        <el-aside class="aside-content">
<<<<<<< HEAD
          <CreatorsList />
=======
          <div>
            <el-scrollbar class="scrollbar">
              <CreatorsList />
            </el-scrollbar>
          </div>
>>>>>>> 64c12e2... スクロールバー移動した
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
import CreatorsList from '../components/CreatorsList.vue'
import LayoutHeader from './component/LayoutHeader.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    CreatorsList,
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
  .aside-content {
<<<<<<< HEAD
    height: calc(100vh - 138px);
  }
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  // height: auto;
  width: 100vw;
  background-color: white;
=======
    height: 100vh;
    overflow: auto;
    .scrollbar {
      height: 100%;
    }
  }
>>>>>>> 64c12e2... スクロールバー移動した
}
</style>
