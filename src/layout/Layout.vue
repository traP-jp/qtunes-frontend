<template>
  <div id="app">
    <el-container class="layout-container">
      <LayoutHeader />
      <el-container>
        <el-aside class="aside-content">
          <el-scrollbar
            :height="
              musicId.length > 0 ? 'calc(100vh - 140px)' : 'calc(100vh - 60px)'
            "
          >
            <CreatorsList />
          </el-scrollbar>
        </el-aside>
        <el-main class="main-content">
          <el-scrollbar
            :height="
              musicId.length > 0 ? 'calc(100vh - 180px)' : 'calc(100vh - 100px)'
            "
          >
            <slot />
          </el-scrollbar>
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
        <LayoutPlayer
          :id="musicId"
          :user-id="userId"
          :title="title"
          :is-fav="isFav"
          @toggleFav="toggleFav"
        />
      </div>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CreatorsList from '../components/CreatorsList.vue'
import { useStore } from '../main'
import { api } from '../utils/api'
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
    const isFav = ref(store.state.isFav)
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
        isFav.value = store.state.isFav
      },
      {
        deep: true,
      }
    )
    const toggleFav = async (value: boolean) => {
      try {
        await api.putFileFavorite(id.value, value)
        isFav.value = value
        store.state.isFav = value
      } catch (err) {
        console.error(err)
      }
    }
    return {
      musicId: id,
      title,
      userId,
      isFav,
      toggleFav,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  width: 100vw;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  // height: auto;
  width: 100vw;
  background-color: white;
}
</style>
