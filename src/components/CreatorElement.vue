<template>
  <el-card
    shadow="never"
    class="creator-element-card"
    :body-style="{ padding: '5px 5px 5px 5px' }"
  >
    <el-row :gutter="5">
      <el-col :span="4">
        <img
          :src="`https://q.trap.jp/api/1.0/public/icon/${traqId}`"
          width="30"
          height="30"
          :style="{ 'padding-top': '7px' }"
        />
      </el-col>
      <el-tooltip placement="top" :content="`@${traqId}`" :show-after="100">
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
  line-height: 44px;
  max-width: 200px;
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
