<template>
  <Layout>
    <!-- 違う人のユーザーページにアクセスした時、infinite-scroll の関係でリレンダリングしてほしいから key つけてる -->
    <router-view :key="$route.path" />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Layout from './layout/Layout.vue'

export default defineComponent({
  name: 'App',
  components: {
    Layout,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  height: 100vh;
}
</style>
