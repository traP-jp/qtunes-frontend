<template>
  <el-header class="header-container">
    <div class="left-content">
      <el-row>
        <img src="../../assets/logo.png" :width="40" class="logo" />
        PRODUCT NAME
      </el-row>
    </div>
    <!-- TODO: link修正 -->
    <div class="right-content">
      <el-menu mode="horizontal" :default-active="activePath()">
        <MenuIcon msg="index 1" icon="el-icon-eleme" link="/" :ind="1" />
        <MenuIcon
          msg="index 2"
          icon="el-icon-eleme"
          link="/files/favorite"
          :ind="2"
        />
        <MenuIcon msg="index 3" icon="el-icon-eleme" link="/user" :ind="3" />
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
    const activePath = (): String => {
      //TODO: pathに応じたindexを返すようにする
      return '2'
    }
    return {
      activePath,
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
