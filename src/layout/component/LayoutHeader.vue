<template>
  <el-header class="header-container">
    <div class="left-content">
      <el-row>
        <img src="../../assets/logo.png" :width="40" class="logo" />
        PRODUCT NAME
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
          <menu-icon msg="index 1" icon="el-icon-eleme" />
        </el-menu-item>
        <el-menu-item index="2">
          <menu-icon msg="index 2" icon="el-icon-eleme" />
        </el-menu-item>
        <el-menu-item index="3">
          <menu-icon msg="index 3" icon="el-icon-eleme" />
        </el-menu-item>
      </el-menu>
    </div>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuIcon from '../../components/MenuIcon.vue'

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    MenuIcon,
  },
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
      line-height: 60px;
    }
  }
  .right-content {
    margin-left: auto;
    display: inline-block;
  }
}
</style>
