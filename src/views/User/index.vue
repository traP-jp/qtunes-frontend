<template>
  <template v-if="userInfo === null || drawingFiles === null">
    <div class="title-content">
      <i class="el-icon-heavy-rain title-icon" />
      存在しないユーザーです
    </div>
  </template>
  <div v-else class="page-container">
    <el-row :gutter="56">
      <el-col
        :span="24"
        :md="{ span: 8 }"
        :lg="{ span: 6 }"
        class="user-info-container"
      >
        <el-image
          :src="`https://q.trap.jp/api/1.0/public/icon/${userInfo.name}`"
          draggable="false"
          class="image-content"
        >
          <template #error>
            <div class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </template>
        </el-image>
        <div class="user-name-content">
          {{ userInfo.name }}
        </div>
        <div class="post-count-content">{{ userInfo.post_count }}曲</div>
      </el-col>
      <el-col :span="24" :md="{ span: 16 }" :lg="{ span: 18 }">
        <template v-if="userInfo.files.length === 0">
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
              :key="userInfo.files[0].audioId"
              :info="userInfo.files[0]"
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
                :lg="12"
                :span="24"
                class="file-element-col"
              >
                <FileElement :info="file" @toggleFav="toggleFav(idx, $event)" />
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, Ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FileElement, { FileElementProps } from '../../components/FileElement.vue'
import { Composer } from '../../lib/apis/generated'
import { api } from '../../utils/api'

export default defineComponent({
  name: 'User',
  components: {
    FileElement,
  },
  setup() {
    const route = useRoute()
    const name = computed(() => route.params.userId as string)
    const userInfo: Ref<(Composer & { files: FileElementProps[] }) | null> =
      ref(null)
    const fetchUserInfo = async () => {
      try {
        const { data: info } = await api.getComposerByName(name.value)
        let files: FileElementProps[] = []
        try {
          const { data: datas } = await api.getComposerFiles(info.id)
          files = datas.map((data) => ({
            audioId: data.id,
            messageId: data.message_id,
            userId: data.composer_name,
            title: data.title,
            isFav: data.is_favorite_by_me,
            createdAt: data.created_at,
          }))
        } catch (err) {
          console.error(err)
        }
        userInfo.value = {
          ...info,
          files,
        }
      } catch (err) {
        console.error(err)
      }
    }
    onMounted(() => {
      fetchUserInfo()
    })
    const drawingFiles: Ref<FileElementProps[] | null> = ref([])
    const drawingCount: Ref<number> = ref(0)
    const loadFile = () => {
      if (userInfo.value === null) {
        drawingFiles.value = null
        drawingCount.value = 0
        return
      }
      drawingCount.value = Math.min(
        drawingCount.value + 20,
        userInfo.value.files.length
      )
      drawingFiles.value = userInfo.value.files.slice(0, drawingCount.value)
    }
    const toggleFav = async (idx: number, value: boolean) => {
      if (userInfo.value === null) {
        console.error('user is empty')
        return
      }
      try {
        await api.putFileFavorite(userInfo.value.files[idx].audioId, value)
        userInfo.value.files[idx].isFav = value
      } catch (err) {
        console.error(err)
      }
    }
    return {
      name,
      userInfo,
      toggleFav,
      drawingFiles,
      loadFile,
    }
  },
})
</script>

<style lang="scss" scoped>
.user-info-container {
  text-align: center;
  .image-content {
    display: block;
    border-radius: 50%;
    @media screen and (max-width: 991px) {
      width: min(100%, 256px);
      margin: {
        left: auto;
        right: auto;
      }
    }
  }
  .user-name-content {
    overflow: hidden;
    overflow-wrap: break-word;
    margin-top: 16px;
    font-weight: bold;
    font-size: 24px;
  }
  .post-count-content {
    margin-top: 4px;
    color: #909399;
  }
}
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
