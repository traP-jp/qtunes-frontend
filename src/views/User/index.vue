<template>
  <template v-if="userInfo === null">
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
              :key="userInfo.files[0].id"
              :title="userInfo.files[0].title"
              :user-id="userInfo.files[0].composer_name"
              :audio-id="userInfo.files[0].id"
              :created-at="userInfo.files[0].created_at"
              :is-fav="userInfo.files[0].is_favorite_by_me"
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
                v-for="(file, idx) in userInfo.files"
                :key="file.id"
                :lg="12"
                :span="24"
                class="file-element-col"
              >
                <FileElement
                  :title="file.title"
                  :user-id="file.composer_name"
                  :audio-id="file.id"
                  :created-at="file.created_at"
                  :is-fav="file.is_favorite_by_me"
                  @toggleFav="toggleFav(idx, $event)"
                />
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, Ref } from 'vue'
import { useRoute } from 'vue-router'
import FileElement from '../../components/FileElement.vue'
import { Composer, ModelFile } from '../../lib/apis/generated'
import { api } from '../../utils/api'

export default defineComponent({
  name: 'User',
  components: {
    FileElement,
  },
  setup() {
    const route = useRoute()
    const name = route.params.userId as string
    const userInfo: Ref<(Composer & { files: ModelFile[] }) | null> = ref(null)
    const fetchUserInfo = async () => {
      try {
        const { data: info } = await api.getComposerByName(name)
        let files: ModelFile[] = []
        try {
          ;({ data: files } = await api.getComposerFiles(info.id))
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
    fetchUserInfo()
    const toggleFav = async (idx: number, value: boolean) => {
      if (userInfo.value === null) {
        console.error('user is empty')
        return
      }
      try {
        await api.putFileFavorite(userInfo.value.files[idx].id, value)
        userInfo.value.files[idx].is_favorite_by_me = value
      } catch (err) {
        console.error(err)
      }
    }
    return {
      name,
      userInfo,
      toggleFav,
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
