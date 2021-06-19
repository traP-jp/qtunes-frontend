<template>
  <div>This is Top</div>
  <router-link to="/files">to files</router-link>
  <el-input v-model="id" />
  <el-button @click="chgId">chg ID</el-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '../../main'

export default defineComponent({
  name: 'Top',
  components: {},
  setup() {
    const store = useStore()
    const id = ref('')
    const chgId = () => {
      store.dispatch('chgAudio', {
        id: id.value,
        title: 'sample title',
        composer: 'takku_bobshiroshiro_titech_trap',
      })
    }
    return {
      id,
      chgId,
    }
  },
})
</script>

<style lang="scss" scoped></style>
