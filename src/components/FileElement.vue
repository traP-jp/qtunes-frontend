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
          <el-tooltip :content="title" placement="top" :show-after="500">
            <div class="sound-title">
              {{ title }}
            </div>
          </el-tooltip>
          <router-link :to="`/users/${userId}`">
            <div class="sound-composer">
              {{ createdAt.length === 0 ? userId : formatedCreatedAt }}
            </div>
          </router-link>
        </div>
      </el-col>
      <el-col :span="5" class="buttons-container">
        <FavButton :is-fav="isFav" @click="toggleFav" />
        <BigIconButton icon="el-icon-top-right" @click="openFileLink" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../main'
import BigIconButton from './BigIconButton.vue'
import FavButton from '/@/components/FavButton.vue'

export default defineComponent({
  name: 'FileElement',
  components: { BigIconButton, FavButton },
  props: {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    audioId: {
      type: String,
      required: true,
    },
    isFav: {
      type: Boolean,
      required: true,
    },
    createdAt: {
      type: String,
      default: '',
    },
  },
  emits: {
    toggleFav() {
      return true
    },
  },
  setup(props, { emit }) {
    const store = useStore()
    const chgAudio = async () => {
      store.dispatch('chgAudio', {
        id: props.audioId,
        title: props.title,
        composer: props.userId,
        isFav: props.isFav,
      })
    }
    const toggleFav = () => {
      emit('toggleFav', !props.isFav)
    }
    const openFileLink = () => {
      window.open(`https://q.trap.jp/files/${props.audioId}`)
    }
    const formatedCreatedAt = computed(() => {
      if (props.createdAt.length === 0) {
        return ''
      }
      return props.createdAt.slice(0, 10)
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
