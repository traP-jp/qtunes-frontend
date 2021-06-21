<template>
  <el-button
    class="big-icon-button"
    plain
    circle
    @click="$emit('click', $event)"
  >
    <i :class="`${icon} big-icon`" />
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BigIconButton',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  emits: ['click'],
  setup() {},
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
    font-size: 48px;
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
