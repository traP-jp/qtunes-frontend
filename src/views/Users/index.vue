<template>
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

<style scoped></style>
