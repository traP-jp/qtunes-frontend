<template>
  <div id="app">
    <el-container class="layout-container">
      <!-- TODO: レイアウト配置をいい感じにする (scrollbar の height 指定とかちょっとキモい fixed とか) -->
      <LayoutHeader v-if="!isMobile" />
      <el-container>
        <el-aside v-if="!isMobile" class="aside-content">
          <el-scrollbar
            :height="`calc(100vh - ${footerHeight + isMobile ? 0 : 60}px)`"
          >
            <CreatorsList />
          </el-scrollbar>
        </el-aside>
        <el-main :class="`main-content ${isMobile ? 'mobile-main' : ''}`">
          <el-scrollbar
            :height="`calc(100vh-${footerHeight + 20 + isMobile ? 0 : 60}px`"
          >
            <slot />
          </el-scrollbar>
        </el-main>
      </el-container>
      <!-- element ui のレイアウトの関係で見た目上の footer に合わせるために見えない footer を置いてる -->
      <el-footer :height="footerHeight" style="visibility: hidden" />
      <div
        v-if="isMobile"
        class="el-footer fixed-footer mobile-menu"
        height="60px"
      >
        <LayoutMobileMenu />
      </div>
      <transition name="el-zoom-in-bottom">
        <div
          v-if="isPlaying"
          :class="`el-footer fixed-footer${isMobile ? ' mobile-player' : ''}`"
          height="80px"
        >
          <!-- mobile => 60px, other => 80px -->
          <!-- TODO: height は js で変える (css じゃなくて) -->
          <LayoutPlayer />
        </div>
      </transition>
    </el-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import CreatorsList from '../components/CreatorsList.vue'
import { useAudios, useTerminalOptions } from '../store'
import LayoutHeader from './component/LayoutHeader.vue'
import LayoutPlayer from './component/LayoutPlayer.vue'
import LayoutMobileMenu from './component/LayoutMobileMenu.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    CreatorsList,
    LayoutHeader,
    LayoutPlayer,
    LayoutMobileMenu,
  },
  setup() {
    const audios = useAudios()
    const terminalOptions = useTerminalOptions()
    const isPlaying = computed(() => audios.id.value !== null)
    const isMobile = computed(
      () => terminalOptions.usingTerminal.value === 'mobile'
    )
    // 見た目上の footer の高さを調整する
    // mobile のときは menu = 60px, player = 60px を足したりたさなかったりする
    // pc のときは player = 80px
    const footerHeight = computed(() => {
      let height = 0
      if (isMobile.value) {
        height += 60
        if (isPlaying.value) {
          height += 60
        }
      } else if (isPlaying.value) {
        height = 80
      }
      return `${height}px`
    })

    return {
      footerHeight,
      isPlaying,
      isMobile,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  width: 100vw;
  .main-content {
    padding-bottom: 0;
  }
  .mobile-main {
    padding-top: 24px;
  }
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  // height: auto;
  width: 100vw;
  background-color: white;
}
.mobile-player {
  bottom: 60px;
  padding: 0;
}

.mobile-menu {
  padding: 0;
}
</style>
