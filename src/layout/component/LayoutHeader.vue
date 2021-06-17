<template>
  <el-header class="header-container">
    <div class="left-content">
      <el-row gutter="10">
        <el-col span="20" class="logo">
          <img
            src="https://pbs.twimg.com/profile_images/1404769598562455554/BOFS5GUG_400x400.png"
            width="40"
          />
        </el-col>
        <el-col span="20"> PRODUCT NAME </el-col>
      </el-row>
    </div>
    <div class="right-content">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <el-tooltip effect="dark" placement="bottom" content="Home">
            <div class="el-icon-s-home" />
          </el-tooltip>
        </el-menu-item>

        <el-menu-item index="2">
          <el-tooltip effect="dark" placement="bottom" content="favs">
            <div class="el-icon-star-on" />
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="3">
          <el-tooltip effect="dark" placement="bottom" content="creators">
            <div class="el-icon-user-solid" />
          </el-tooltip>
        </el-menu-item>
      </el-menu>
    </div>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutHeader',
  setup() {
    const activeIndex = 1
    const handleSelect = () => {}
    return {
      activeIndex,
      handleSelect,
    }
  },
})
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  height: 60px;
  line-height: 60px;
  .left-content {
    margin-right: auto;
    display: inline-block;
    .logo {
      padding: 10px;
      height: 60px;
      line-height: 60px;
    }
  }
  .right-content {
    margin-left: auto;
    display: inline-block;
  }
}
</style>
