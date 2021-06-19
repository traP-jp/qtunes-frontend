<template>
  <el-card
    shadow="never"
    class="creator-element-card"
    :body-style="{ padding: '12px' }"
  >
    <el-row :gutter="6">
      <el-col :span="6">
        <img
          :src="`https://q.trap.jp/api/1.0/public/icon/${traqId}`"
          width="48"
          height="48"
          :style="{ 'padding-top': '7px' }"
        />
      </el-col>
      <el-tooltip placement="right" :content="`@${traqId}`" :show-after="100">
        <el-col :span="20" class="traqid-text">@{{ traqId }} </el-col>
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
  line-height: 59px;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.creator-element-card {
  cursor: pointer !important;
  :hover {
    color: #409eff;
  }
}
</style>
