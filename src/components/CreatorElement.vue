<template>
  <el-card shadow="never" class="card">
    <el-row :gutter="20">
      <el-col :span="40">
        <img
          :src="`https://q.trap.jp/api/1.0/public/icon/${traQID}`"
          width="40"
        />
      </el-col>
      <el-col :span="80" class="text">@{{ traQID }} </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CreatorElement',
  props: {
    traQID: {
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
.text {
  text-align: left;
  line-height: 44px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card {
  cursor: pointer !important;
  :hover {
    color: #409eff;
  }
}
</style>
