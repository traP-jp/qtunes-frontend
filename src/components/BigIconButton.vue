<template>
  <el-button
    class="big-icon-button"
    :type="type"
    plain
    circle
    @click="$emit('click', $event)"
  >
    <i :class="`${icon} big-icon`" :style="iconSizeStyle" />
  </el-button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'BigIconButton',
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: null,
    },
    type: {
      type: String as PropType<
        'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
      >,
      default: 'default',
    },
  },
  emits: ['click'],
  setup(props) {
    const iconSizeStyle = computed(() => ({
      '--icon-size': props.size ?? '1.5rem',
    }))
    return {
      iconSizeStyle,
    }
  },
})
</script>

<style lang="scss" scoped>
.big-icon-button {
  padding: 0 !important;
  border: 0 !important;
  min-height: 0 !important;
  height: 36px;
  width: 36px;
  & > span > i {
    font-size: var(--icon-size);
  }

  &:hover.el-button--default,
  &:focus.el-button--default {
    .fav-icon {
      color: #e6a23c !important;
    }
  }
  &.el-button--warning {
    background-color: transparent !important;
  }
  &:hover.el-button--warning,
  &:focus.el-button--warning {
    background-color: transparent !important;
    color: #e6a23c !important;
  }
}
</style>
