<template>
  <el-card
    shadow="never"
    class="file-element-container"
    :body-style="{ padding: '0' }"
  >
    <el-row class="card-content">
      <el-col :span="19" class="left-content">
        <BigIconButton icon="el-icon-video-play" @click="chgAudio" />
        <div class="audio-info-container">
          <el-tooltip :content="info.title" placement="top" :show-after="500">
            <div class="sound-title">
              {{ info.title }}
            </div>
          </el-tooltip>
          <router-link :to="`/users/${info.userId}`">
            <div class="sound-composer">
              {{
                info.createdAt === undefined ? info.userId : formatedCreatedAt
              }}
            </div>
          </router-link>
        </div>
      </el-col>
      <el-col :span="5" class="buttons-container">
        <FavButton :is-fav="info.isFav" @click="toggleFav" />
        <BigIconButton icon="el-icon-top-right" @click="openFileLink" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useAudios } from '../store'
import { api } from '../utils/api'
import BigIconButton from './BigIconButton.vue'
import FavButton from '/@/components/FavButton.vue'

export interface FileElementProps {
  title: string
  userId: string
  audioId: string
  messageId: string
  isFav: boolean
  createdAt?: string
}

export default defineComponent({
  name: 'FileElement',
  components: { BigIconButton, FavButton },
  props: {
    info: {
      type: Object as PropType<FileElementProps>,
      required: true,
    },
  },
  emits: {
    toggleFav() {
      return true
    },
  },
  setup(props, { emit }) {
    const audios = useAudios()
    const chgAudio = () => {
      audios.playAudio({
        id: props.info.audioId,
        title: props.info.title,
        userId: props.info.userId,
        isFav: props.info.isFav,
      })
    }
    const toggleFav = () => {
      emit('toggleFav', !props.info.isFav)
    }
    const openFileLink = () => {
      window.open(api.generateMessageLink(props.info.messageId))
    }
    const formatedCreatedAt = computed(() => {
      if (props.info.createdAt === undefined) {
        return null
      }
      return props.info.createdAt.slice(0, 10)
    })
    return {
      toggleFav,
      chgAudio,
      openFileLink,
      formatedCreatedAt,
    }
  },
})
</script>

<style lang="scss" scoped>
.file-element-container {
  padding: 18px 16px;
  // background-color: #ebeef5;
  &:hover {
    background-color: rgb(244, 244, 245);
  }
  &:hover button {
    background-color: rgb(244, 244, 245) !important;
    transition: 0.3s;
  }
  .card-content {
    height: 36px;
  }
  .left-content {
    display: flex;
    overflow: hidden;
  }
  .audio-info-container {
    overflow: hidden;
    height: 36px;
    margin-left: 16px;
    & > a {
      text-decoration-line: none;
    }
    .sound-title,
    .sound-composer {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .sound-title {
      font-size: 16px;
      line-height: 20px;
    }
    .sound-composer {
      font-size: 12px;
      line-height: 16px;
      color: #909399;
      text-decoration-line: none;
    }
  }
  .buttons-container {
    display: flex;
    & > button:first-child {
      margin-left: auto;
    }
  }
}
</style>
