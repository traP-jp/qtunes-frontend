<template>
  <el-header class="header-container">
    <div class="left-content">
      <el-row>
        <img src="../../assets/logo.png" :width="40" class="logo" />
        PRODUCT NAME
      </el-row>
    </div>
    <!-- TODO: link, icon msg修正 -->
    <div class="right-content">
      <el-menu mode="horizontal" default-active="1" router>
        <MenuIcon message="Home" icon="el-icon-s-home" route="/" :index="1" />
        <MenuIcon
          message="Files"
          icon="el-icon-folder"
          route="files"
          :index="2"
        />
        <MenuIcon
          message="User"
          icon="el-icon-user-solid"
          route="users"
          :index="3"
        />
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
  setup() {},
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
