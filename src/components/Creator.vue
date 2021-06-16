<template>
  <el-card shadow="hover">
    <el-row :gutter="40">
      <el-col :span="5">
        <img
          v-bind:src="'https://q.trap.jp/api/1.0/public/icon/' + traQID"
          width="40"
        />
      </el-col>
      <el-col :span="6" class="text">@{{ traQID }} </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    traQID: { type: String },
  },
  setup() {
    return {}
  },
})
</script>


<style lang="scss">
.text {
  text-align: left;
  line-height: 44px;
}
</style>