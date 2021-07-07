<template>
  <template v-if="files === null || files.length === 0">
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
      <el-row :gutter="12">
        <el-col
          v-for="(file, idx) in files"
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
import { computed, defineComponent } from 'vue'
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
