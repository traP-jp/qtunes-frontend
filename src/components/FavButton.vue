<template>
  <BigIconButton
    :type="isFav ? 'warning' : 'default'"
    :icon="isFav ? 'el-icon-star-on' : 'el-icon-star-off'"
    :size="size"
    class="fav-icon"
    @click="$emit('click', $event)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BigIconButton from '/@/components/BigIconButton.vue'

export default defineComponent({
  name: 'FavButton',
  components: {
    BigIconButton,
  },
  props: {
    size: {
      type: String,
      default: null,
    },
    isFav: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['click'],
  setup() {},
})
</script>

<style lang="scss" scoped>
.fav-icon:hover,
.fav-icon:focus {
  &.el-button--default {
    color: #e6a23c !important;
  }
}
</style>
