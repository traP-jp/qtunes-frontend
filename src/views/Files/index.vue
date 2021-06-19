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
      <file-element
        :key="files[0].id"
        :title="files[0].title"
        :user-id="files[0].composer_name"
        :music-id="files[0].id"
        :is-fav="files[0].is_favorite_by_me"
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
          :key="file.id"
          :md="12"
          :span="24"
          class="file-element-col"
        >
          <file-element
            :title="file.title"
            :user-id="file.composer_name"
            :music-id="file.id"
            :is-fav="file.is_favorite_by_me"
            @toggleFav="toggleFav(idx, $event)"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import FileElement from '../../components/FileElement.vue'
import { ModelFile } from '../../lib/apis/generated'
import { api } from '../../utils/api'

export default defineComponent({
  name: 'Files',
  components: {
    FileElement,
  },
  setup() {
    const files: Ref<ModelFile[] | null> = ref(null)
    const fetchFiles = async () => {
      try {
        const { data } = await api.getFiles()
        files.value = data
      } catch (err) {
        console.error(err)
      }
    }
    fetchFiles()
    const toggleFav = async (idx: number, value: boolean) => {
      if (files.value === null) {
        console.error('files is empty')
        return
      }
      try {
        await api.putFileFavorite(files.value[idx].id, value)
        files.value[idx].is_favorite_by_me = value
      } catch (err) {
        console.error(err)
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
