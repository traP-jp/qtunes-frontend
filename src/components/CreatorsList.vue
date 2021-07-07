<template>
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
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDatas } from '../store'
import CreatorElement from './CreatorElement.vue'

export default defineComponent({
  name: 'CreatorsList',
  components: {
    CreatorElement,
  },
  setup() {
    const route = useRoute()
    const datas = useDatas()
    const composers = computed(
      () => datas.composers.value?.map((composer) => composer.name) ?? null
    )
    const activeIndex = ref(route.path)
    watch(
      () => route.path,
      () => {
        activeIndex.value = route.path
      }
    )
    datas.fetchComposers()
    return {
      composers,
      activeIndex,
    }
  },
})
</script>

<style lang="scss" scopped></style>
