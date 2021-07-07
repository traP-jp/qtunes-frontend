<template>
  <template
    v-if="files === null || files.length === 0 || drawingFiles === null"
  >
    <div class="title-content">
      <i class="el-icon-heavy-rain title-icon" />
      まだ曲がありません
    </div>
  </template>
  <div v-else>
    <div>
      <div class="title-content">
        <i class="el-icon-sort title-icon" />
        Latest track
      </div>
      <FileElement
        :key="files[0].audioId"
        :info="files[0]"
        @toggleFav="toggleFav(0, $event)"
      />
    </div>
    <div class="list-container">
      <div class="title-content">
        <i class="el-icon-notebook-2 title-icon" />
        All tracks
      </div>
      <el-row v-infinite-scroll="loadFile" :gutter="12">
        <el-col
          v-for="(file, idx) in drawingFiles"
          :key="file.audioId"
          :md="12"
          :span="24"
          class="file-element-col"
        >
          <FileElement :info="file" @toggleFav="toggleFav(idx, $event)" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { computed, defineComponent, Ref, ref, watch } from 'vue'
import FileElement, { FileElementProps } from '../../components/FileElement.vue'
import { useDatas } from '../../store'

export default defineComponent({
  name: 'Files',
  components: {
    FileElement,
  },
  setup() {
    const datas = useDatas()
    const files = computed((): FileElementProps[] | null =>
      datas.files.value === null
        ? null
        : datas.files.value.map((data) => ({
            audioId: data.id,
            messageId: data.message_id,
            userId: data.composer_name,
            title: data.title,
            isFav: data.is_favorite_by_me,
          }))
    )
    datas.fetchFiles()
    const drawingFiles: Ref<FileElementProps[] | null> = ref([])
    const drawingCount: Ref<number> = ref(0)
    const loadFile = () => {
      if (files.value === null) {
        drawingFiles.value = null
        drawingCount.value = 0
        return
      }
      drawingCount.value = Math.min(drawingCount.value + 20, files.value.length)
      drawingFiles.value = files.value.slice(0, drawingCount.value)
    }
    watch(
      () => files,
      (newFiles) => {
        if (newFiles.value === null) {
          drawingFiles.value = null
          drawingCount.value = 0
          return
        }
        drawingCount.value = Math.min(drawingCount.value, newFiles.value.length)
        drawingFiles.value = newFiles.value.slice(0, drawingCount.value)
      }
    )
    const toggleFav = async (idx: number, value: boolean) => {
      try {
        await datas.updateFilesFav(idx, value)
      } catch (err) {
        ElMessage.error({
          type: 'error',
          message: `Toggle Fav failed: ${err}`,
        })
      }
    }
    return {
      files,
      toggleFav,
      drawingFiles,
      loadFile,
    }
  },
})
</script>

<style lang="scss" scoped>
.list-container {
  margin-top: 24px;
}
.title-content {
  margin-bottom: 18px;
  font-weight: bold;
  line-height: 24px;
  font-size: 18px;
  .title-icon {
    font-size: 18px;
    margin-right: 8px;
  }
}
.file-element-col {
  margin-bottom: 8px;
}
</style>
