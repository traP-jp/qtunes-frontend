<template>
  <el-card shadow="never" class="creator_element_card">
    <el-row :gutter="20">
      <el-col :span="40">
        <img
          :src="`https://q.trap.jp/api/1.0/public/icon/${traqId}`"
          width="40"
        />
      </el-col>
      <el-tooltip placement="top" :content="`@${traqId}`" :show-after="100">
        <el-col :span="80" class="traqid_text">@{{ traqId }} </el-col>
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
.traqid_text {
  text-align: left;
  line-height: 44px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.creator_element_card {
  cursor: pointer !important;
  :hover {
    color: #409eff;
  }
}
</style>
