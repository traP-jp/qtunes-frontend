<template>
  <el-menu-item
    :style="{ 'padding-left': '0' }"
    :index="index"
    :route="{ name: 'user', params: { userId: traqId } }"
  >
    <el-col>
      <img
        :src="`https://q.trap.jp/api/1.0/public/icon/${traqId}`"
        width="48"
        height="48"
        draggable="false"
        class="creator-icon"
      />
    </el-col>
    <el-tooltip placement="right" :content="`@${traqId}`" :show-after="500">
      <el-col class="traqid-text">
        {{ traqId }}
      </el-col>
    </el-tooltip>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CreatorElement',
  props: {
    traqId: {
      type: String,
      required: true,
    },
    index: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.el-menu-item {
  height: 72px;
  .creator-icon {
    border-radius: 50%;
    padding: 12px 12px 12px 12px;
  }
  .traqid-text {
    line-height: 72px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
