<template>
  <div id="app">
    <el-container class="layout-container">
      <layout-header />
      <!-- <el-header class="header-container"> header </el-header> -->
      <el-container>
        <el-aside class="aside-content">
          <div>
            <CreatorsList />
          </div>
        </el-aside>
        <el-main class="main-content">
          <slot />
        </el-main>
      </el-container>
      <el-footer class="fixed-footer" height="auto">
        <LayoutPlayer :id="musicId" :user-id="userId" :title="title" />
      </el-footer>
      <!-- <el-footer>footer</el-footer> -->
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CreatorsList from '../components/CreatorsList.vue'
import { useStore } from '../main'
import LayoutHeader from './component/LayoutHeader.vue'
import LayoutPlayer from './component/LayoutPlayer.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    CreatorsList,
    LayoutHeader,
    LayoutPlayer,
  },
  setup() {
    const store = useStore()
    const id = ref(store.state.id)
    const title = ref(store.state.title)
    const userId = ref(store.state.composer)
    store.watch(
      () => store.state.id,
      (newId) => {
        id.value = newId
        title.value = store.state.title
        userId.value = store.state.composer
      }
    )
    return {
      musicId: id,
      title,
      userId,
    }
  },
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
