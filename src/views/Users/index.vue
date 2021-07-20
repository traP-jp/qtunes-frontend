<template>
  <div class="title-content">
    <i class="el-icon-user title-icon" />
    ユーザー一覧
  </div>
  <CreatorsList :hide-border="isMobile" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import CreatorsList from '../../components/CreatorsList.vue'
import { useTerminalOptions } from '../../store'

export default defineComponent({
  name: 'Users',
  components: {
    CreatorsList,
  },
  setup() {
    const terminalOptions = useTerminalOptions()
    const isMobile = computed(
      () => terminalOptions.usingTerminal.value === 'mobile'
    )
    return {
      isMobile,
    }
  },
})
</script>

<style lang="scss" scoped>
.title-content {
  margin-bottom: 18px;
  font-weight: bold;
  line-height: 24px;
  font-size: 18px;
  .title-icon {
    font-size: 18px;
    margin-right: 8px;
  }
}
</style>
