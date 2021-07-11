<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    router
    background-color="#e9e9eb"
    class="mobile-menu"
  >
    <el-menu-item
      v-for="menuContent in menuContents"
      :key="menuContent.route"
      :index="menuContent.route"
      :route="menuContent.route"
      class="mobile-menu-item"
    >
      <i :class="menuContent.icon" />
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MobileMenu',
  components: {},
  setup() {
    const menuContents = [
      {
        route: '/',
        icon: 'el-icon-s-home',
      },
      {
        route: '/favorite',
        icon: 'el-icon-star-on',
      },
      {
        route: '/files',
        icon: 'el-icon-folder',
      },
      {
        route: '/users',
        icon: 'el-icon-user',
      },
    ]
    return {
      menuContents,
    }
  },
})
</script>

<style lang="scss" scoped>
.mobile-menu {
  display: flex;
  .mobile-menu-item {
    flex-grow: 2;
    float: none !important;
    text-align: center;
    & > i {
      margin: auto;
    }
  }
}
</style>
