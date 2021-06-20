<template>
  <div>
    <el-row class="player-container">
      <el-col :span="4" class="all-info-container">
        <router-link :to="composersLink">
          <img
            height="38"
            width="38"
            :src="`https://q.trap.jp/api/1.0/public/icon/${userId}`"
          />
        </router-link>
        <div class="info-container">
          <el-tooltip :content="title" placement="top" :show-after="300">
            <div class="sound-title">
              {{ title }}
            </div>
          </el-tooltip>
          <router-link :to="composersLink">
            <div class="sound-composer">
              {{ userId }}
            </div>
          </router-link>
        </div>
      </el-col>
      <el-col :offset="2" :span="12" class="time-slider-container">
        <el-row class="time-slider-with-msg">
          <el-col class="time-msg time-msg__left">{{
            formatPos(nowPos)
          }}</el-col>
          <el-col class="time-slider-col">
            <el-slider
              v-model.number="nowPos"
              :step="1"
              :max="Number.isNaN(musicLength) ? 100 : musicLength"
              :format-tooltip="formatPos"
              class="time-slider"
              @input="onPosChange"
            />
          </el-col>
          <el-col class="time-msg">{{ formatPos(musicLength) }}</el-col>
        </el-row>
      </el-col>
      <el-col :offset="0" :span="2" class="controle-button-container">
        <el-button
          class="big-icon-button"
          :type="audio.isLoop ? 'primary' : 'default'"
          plain
          circle
          @click="audio.toggleLoop"
        >
          <i class="el-icon-refresh-right" />
        </el-button>
        <el-button class="big-icon-button" plain circle @click="togglePlay">
          <i
            :class="`${
              isPlayed ? 'el-icon-video-pause' : 'el-icon-video-play'
            } big-icon`"
          />
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-slider
          v-model.number="nowVol"
          :step="1"
          :min="0"
          :max="100"
          class="volume-slider"
          @input="onVolChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import createAudioElement from '../../utils/audio'
import { ref } from 'vue'
import { api } from '../../utils/api'
import { useStore } from '../../main'

export default defineComponent({
  name: 'LayoutPlayer',
  props: {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const nowPos = ref(0)
    const audio = ref(
      createAudioElement(props.id, {
        ended: async () => {
          const { data } = await api.getFileRandom()
          store.dispatch('chgAudio', {
            id: data.id,
            title: data.title,
            composer: data.composer_name,
            isFav: data.is_favorite_by_me,
          })
        },
        timeUpdate: (time: number) => {
          nowPos.value = time
        },
      })
    )
    audio.value.play()
    watch(
      () => props.id,
      (id: string) => {
        console.log(`id: ${id}`)
        nowPos.value = 0
        audio.value.broke()
        const flag = audio.value.isLoop
        audio.value = ref(
          createAudioElement(id, {
            ended: async () => {
              const { data } = await api.getFileRandom()
              store.dispatch('chgAudio', {
                id: data.id,
                title: data.title,
                composer: data.composer_name,
                isFav: data.is_favorite_by_me,
              })
            },
            timeUpdate: (time: number) => {
              nowPos.value = time
            },
          })
        ).value
        audio.value.setVolume(nowVol.value)
        if (audio.value.isLoop !== flag) {
          audio.value.toggleLoop()
        }
        audio.value.play()
      }
    )
    const nowVol = ref(audio.value.volume)
    const musicLength = computed(() => {
      return Math.ceil(audio.value.maxTime)
    })
    const isPlayed = computed(() => !audio.value.isPaused)

    const onPosChange = (event: number) => {
      if (!Number.isInteger(event)) {
        return
      }
      audio.value.setTime(event)
    }
    const onVolChange = (event: number) => {
      audio.value.setVolume(event)
    }

    const formatPos = (val: number) => {
      if (Number.isNaN(val)) {
        return '-'
      }
      const ceilVal = Math.ceil(val)
      const minute = (ceilVal / 60) | 0
      const second = ceilVal % 60
      if (Number.isNaN(minute) || Number.isNaN(second)) {
        return '-'
      }
      return `${minute}:${('00' + second).slice(-2)}`
    }

    const togglePlay = () => {
      isPlayed.value ? audio.value.pause() : audio.value.play()
    }

    const composersLink = `/users/${props.userId}`

    return {
      audio,
      musicLength,
      nowPos,
      nowVol,
      onPosChange,
      onVolChange,
      isPlayed,
      togglePlay,
      formatPos,
      composersLink,
    }
  },
})
</script>

<style lang="scss" scoped>
.player-container {
  padding: {
    top: 16px;
    bottom: 16px;
    right: 16px;
    left: 16px;
  }
  .all-info-container {
    overflow: hidden;
    display: flex;
    .info-container {
      overflow: hidden;
      margin-left: 12px;
      flex-shrink: 1;
      & > a {
        text-decoration-line: none;
      }
      .sound-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        line-height: 20px;
      }
      .sound-composer {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        line-height: 16px;
        color: #909399;
      }
    }
  }
  .time-slider-container {
    text-align: center;
    .time-slider-with-msg {
      width: 100%;
      display: inline-block;
      .time-msg {
        width: 4rem;
        line-height: 38px;
      }
      .time-msg__left {
        color: #409eff;
      }
      .time-slider-col {
        width: calc(100% - 8rem);
        padding: {
          left: 18px;
          right: 18px;
        }
        .time-slider {
          display: inline-block;
          width: 100%;
        }
      }
    }
  }
  .controle-button-container {
    display: flex;
    padding-right: 16px;
    .big-icon-button {
      padding: 0 !important;
      border: 0 !important;
      min-height: 0 !important;
      margin: {
        top: auto;
        bottom: auto;
      }
      &:first-of-type {
        margin-left: auto;
      }
      & > span > i {
        font-size: 1.5rem;
      }
    }
  }
  .volume-slider {
    display: inline-block;
    width: 100%;
  }
}
</style>
