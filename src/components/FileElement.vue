<template>
  <el-card
    shadow="never"
    class="file-element-container"
    :body-style="{ padding: '0' }"
  >
    <el-row class="card-content">
      <el-col :span="19" class="left-content">
        <el-button class="big-icon-button" plain circle @click="chgAudio">
          <i :class="'el-icon-video-play big-icon'" />
        </el-button>
        <div class="audio-info-container">
          <el-tooltip :content="title" placement="top" :show-after="300">
            <div class="sound-title">
              {{ title }}
            </div>
          </el-tooltip>
          <router-link :to="`/users/${userId}`">
            <div class="sound-composer">
              {{ createdAt.length === 0 ? userId : createdAt }}
            </div>
          </router-link>
        </div>
      </el-col>
      <el-col :span="5" class="buttons-container">
        <el-button
          :type="isFav ? 'warning' : 'default'"
          class="big-icon-button"
          plain
          circle
          @click="toggleFav"
        >
          <i
            :class="`${
              isFav ? 'el-icon-star-on' : 'el-icon-star-off'
            } big-icon fav-icon`"
          />
        </el-button>
        <el-button class="big-icon-button" plain circle @click="openFileLink">
          <i class="el-icon-top-right big-icon" />
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../main'

export default defineComponent({
  name: 'FileElement',
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
    return {
      toggleFav,
      chgAudio,
      openFileLink,
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
  .big-icon-button {
    padding: 0 !important;
    border: 0 !important;
    min-height: 0 !important;
    height: 36px;
    width: 36px;
    & > span > i {
      font-size: 1.5rem;
    }
  }
  .buttons-container {
    display: flex;
    .big-icon-button {
      &:first-of-type {
        margin-left: auto;
      }
      &:hover.el-button--default,
      &:focus.el-button--default {
        .fav-icon {
          color: #e6a23c !important;
        }
      }
      &.el-button--warning {
        background-color: transparent !important;
      }
      &:hover.el-button--warning,
      &:focus.el-button--warning {
        background-color: transparent !important;
        color: #e6a23c !important;
      }
    }
  }
}
</style>
