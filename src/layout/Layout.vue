<template>
  <div id="app">
    <el-container class="layout-container">
      <LayoutHeader />
      <el-container>
        <el-aside class="aside-content">
          <CreatorsList />
        </el-aside>
        <el-main class="main-content">
          <slot />
        </el-main>
      </el-container>
      <el-footer
        :height="musicId.length > 0 ? '80px' : '0px'"
        style="visibility: hidden"
      />
      <div
        v-if="musicId.length > 0"
        class="el-footer fixed-footer"
        height="80px"
      >
        <LayoutPlayer :id="musicId" :user-id="userId" :title="title" />
      </div>
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
      () => ({
        id: store.state.id,
        title: store.state.title,
        userId: store.state.composer,
      }),
      async ({ id: newId, title: newTitle, userId: newUserId }) => {
        id.value = newId
        title.value = newTitle
        userId.value = newUserId
      },
      {
        deep: true,
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
  .aside-content {
    height: calc(100vh - 138px);
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
