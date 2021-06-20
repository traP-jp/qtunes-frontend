<template>
  <el-header class="header-container">
    <div class="left-content">
      <img src="../../assets/icon.svg" :width="200" class="logo" />
    </div>
    <div class="menu-content">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        router
        background-color="#e9e9eb"
      >
        <MenuIcon
          message="Home"
          index="top"
          icon="el-icon-s-home"
          route="top"
        />
        <MenuIcon
          message="曲一覧"
          index="files"
          icon="el-icon-folder"
          route="files"
        />
        <MenuIcon
          message="お気に入り"
          index="favorite"
          icon="el-icon-star-on"
          route="favorite"
        />
      </el-menu>
    </div>
    <!-- <div class="right-content">
    </div> -->
  </el-header>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MenuIcon from '../../components/MenuIcon.vue'

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    MenuIcon,
  },
  setup() {
    const route = useRoute()
    const activeIndex = ref(route.name)
    watch(
      () => route.name,
      () => {
        activeIndex.value = route.name
    })
    return {
      activeIndex,
    }
  },
})
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  height: 60px;
  line-height: 60px;
  background-color: #e9e9eb;
  // vertical-align: middle;
  .left-content {
    // margin-right: auto;
    // display: inline-block;
    // vertical-align: bottom;
    line-height: 60px;
    .logo {
      padding: 5px;
      line-height: 60px;
    }
    .title-content {
      vertical-align: top;
      display: inline-block;
      line-height: 60px;
      font-size: 40px;
      font-weight: bold;
      @media screen and (max-width: 767px) {
        display: none;
      }
    }
  }
  .menu-content {
    margin-left: 20px;
  }
  .right-content {
    margin-left: auto;
    display: inline-block;
  }
}
</style>
