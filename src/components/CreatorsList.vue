<template>
  <el-scrollbar>
    <div v-if="composers === null || composers.length === 0">
      <i class="el-icon-heavy-rain" />
      <span> 読込中... </span>
    </div>
    <el-menu v-else router :default-active="activeIndex">
      <CreatorElement
        v-for="composer in composers"
        :key="composer"
        :traq-id="composer"
        :index="`/users/${composer}`"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../utils/api'
import CreatorElement from './CreatorElement.vue'

export default defineComponent({
  name: 'CreatorsList',
  components: {
    CreatorElement,
  },
  setup() {
    const composers: Ref<string[] | null> = ref(null)
    const route = useRoute()
    const activeIndex = ref(route.path)
    watch(
      () => route.path,
      () => {
        activeIndex.value = route.path
    })
    const fetchCreators = async () => {
      try {
        const { data } = await api.getComposers()
        composers.value = data.map((composer) => composer.name)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCreators()
    return {
      composers,
      activeIndex,
    }
  },
})
</script>

<style lang="scss" scopped></style>
