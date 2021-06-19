<template>
  <el-card
    shadow="never"
    class="creator-element-card"
    :body-style="{ padding: '0' }"
  >
    <el-row class="row-style">
      <div>
        <img
          :src="`https://q.trap.jp/api/1.0/public/icon/${traqId}`"
          width="48"
          height="48"
          class="creator-icon"
        />
      </div>
      <el-tooltip placement="right" :content="`@${traqId}`" :show-after="100">
        <div class="traqid-text">{{ traqId }}</div>
      </el-tooltip>
    </el-row>
  </el-card>
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
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.traqid-text {
  text-align: left;
  line-height: 48px;
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.creator-element-card {
  padding: 12px;
  cursor: pointer !important;
  :hover {
    color: #409eff;
  }
  .row-style {
    height: 48px;
  }
  .creator-icon {
    border-radius: 50%;
    padding: 0 12px;
  }
}
</style>
