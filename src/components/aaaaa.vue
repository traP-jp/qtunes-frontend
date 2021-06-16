<template>
  <el-col>
    <el-card shadow="hover">
      <img
        src="https://pbs.twimg.com/profile_images/1404769598562455554/BOFS5GUG_400x400.png"
        width="50"
        height="50"
      />
      {{ traQID }}
    </el-card>
  </el-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    traQID: { type: String },
  },
  setup() {},
})
</script>
