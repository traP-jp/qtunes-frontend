<template>
  <div>This is Top</div>
  <router-link to="/files">to files</router-link>
  <el-button @click="chgId">chg file</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../../main'
import { api } from '../../utils/api'

export default defineComponent({
  name: 'Top',
  components: {},
  setup() {
    const store = useStore()
    const chgId = async () => {
      const { data } = await api.getFileRandom()
      store.dispatch('chgAudio', {
        id: data.id,
        title: data.title,
        composer: data.composer_name,
        isFav: data.is_favorite_by_me,
      })
    }
    return {
      chgId,
    }
  },
})
</script>

<style lang="scss" scoped></style>
