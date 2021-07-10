<template>
  <template v-if="favs === null || drawingFavs === null">
    <div class="title-content">
      <i class="el-icon-heavy-rain title-icon" />
      読込中...
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
          :src="`https://q.trap.jp/api/1.0/public/icon/${myId}`"
          draggable="false"
          class="image-content"
        >
          <template #error>
            <div class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </template>
        </el-image>
        <div class="user-name-content">お気に入り</div>
        <div class="post-count-content">{{ favs.length }}曲</div>
      </el-col>
      <el-col :span="24" :md="{ span: 16 }" :lg="{ span: 18 }">
        <template v-if="favs.length === 0">
          <div class="title-content">
            <i class="el-icon-star-off title-icon" />
            まだお気に入りに登録された曲がありません
          </div>
        </template>
        <div v-else>
          <div class="list-container">
            <div class="title-content">
              <i class="el-icon-star-on title-icon" />
              All favs
            </div>
            <el-row v-infinite-scroll="loadFile" :gutter="12">
              <el-col
                v-for="(file, idx) in drawingFavs"
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
import { ElMessage } from 'element-plus'
import { defineComponent, computed, ref, Ref, watch } from 'vue'
import FileElement, { FileElementProps } from '../../components/FileElement.vue'
import { useDatas } from '../../store'

export default defineComponent({
  name: 'User',
  components: {
    FileElement,
  },
  setup() {
    const datas = useDatas()
    const myId = computed(() => datas.me.value)
    datas.fetchMeFromStorage()
    const favs = computed((): FileElementProps[] | null =>
      datas.favs.value === null
        ? null
        : datas.favs.value.map((data) => ({
            audioId: data.id,
            messageId: data.message_id,
            userId: data.composer_name,
            title: data.title,
            isFav: data.is_favorite_by_me,
          }))
    )
    datas.fetchFavs()
    const drawingFavs: Ref<FileElementProps[] | null> = ref([])
    const drawingCount: Ref<number> = ref(0)
    const loadFile = () => {
      if (favs.value === null) {
        drawingFavs.value = null
        drawingCount.value = 0
        return
      }
      drawingCount.value = Math.min(drawingCount.value + 20, favs.value.length)
      drawingFavs.value = favs.value.slice(0, drawingCount.value)
    }
    watch(
      () => favs,
      (newFavs) => {
        if (newFavs.value === null) {
          drawingFavs.value = null
          drawingCount.value = 0
          return
        }
        drawingCount.value = Math.min(drawingCount.value, newFavs.value.length)
        drawingFavs.value = newFavs.value.slice(0, drawingCount.value)
      }
    )
    const toggleFav = async (idx: number, value: boolean) => {
      try {
        await datas.updateFavsFav(idx, value)
      } catch (err) {
        ElMessage.error({
          type: 'error',
          message: `Toggle Fav failed !: ${err}`,
        })
      }
    }
    return {
      myId,
      favs,
      toggleFav,
      drawingFavs,
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
