<template>
  <div id="app">
    <el-container class="layout-container">
      <LayoutHeader />
      <el-container>
        <el-aside class="aside-content">
          <el-scrollbar
            :height="isPlaying ? 'calc(100vh - 140px)' : 'calc(100vh - 60px)'"
          >
            <CreatorsList />
          </el-scrollbar>
        </el-aside>
        <el-main class="main-content">
          <el-scrollbar
            :height="isPlaying ? 'calc(100vh - 180px)' : 'calc(100vh - 100px)'"
          >
            <slot />
          </el-scrollbar>
        </el-main>
      </el-container>
      <el-footer
        :height="isPlaying ? '80px' : '0px'"
        style="visibility: hidden"
      />
      <div v-if="isPlaying" class="el-footer fixed-footer" height="80px">
        <LayoutPlayer />
      </div>
    </el-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import CreatorsList from '../components/CreatorsList.vue'
import { useAudios, useDatas } from '../store'
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
    const audios = useAudios()
    const isPlaying = computed(() => audios.id.value !== null)

    onMounted(() => {
      const datas = useDatas()
      datas.setMe(sessionStorage.getItem('me')!)
    })

    return {
      isPlaying,
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
