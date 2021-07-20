<template>
  <div v-if="isMobile">
    <el-progress
      :percentage="Math.ceil((nowPos / musicLength) * 100)"
      :show-text="false"
    />
    <div class="mobile-all-container">
      <el-image
        style="width: 54px; height: 54px"
        class="mobile-image"
        draggable="false"
        :src="`https://q.trap.jp/api/1.0/public/icon/${audioInfo.userId}`"
      />
      <div class="mobile-infos-container">
        <div class="info-container">
          <div class="sound-title">
            {{ audioInfo.title }}
          </div>
          <router-link :to="composersLink">
            <div class="sound-composer">
              {{ audioInfo.userId }}
            </div>
          </router-link>
        </div>
        <div class="mobile-button-container">
          <FavButton :is-fav="audioInfo.isFav" @click="toggleFav" />
          <BigIconButton
            :icon="isPlayed ? 'el-icon-video-pause' : 'el-icon-video-play'"
            @click="togglePlay"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <el-row class="player-container">
      <el-col :span="4" class="all-info-container">
        <router-link :to="composersLink">
          <img
            height="38"
            width="38"
            draggable="false"
            :src="`https://q.trap.jp/api/1.0/public/icon/${audioInfo.userId}`"
          />
        </router-link>
        <div class="info-container">
          <el-tooltip
            :content="audioInfo.title"
            placement="top"
            :show-after="500"
          >
            <div class="sound-title">
              {{ audioInfo.title }}
            </div>
          </el-tooltip>
          <router-link :to="composersLink">
            <div class="sound-composer">
              {{ audioInfo.userId }}
            </div>
          </router-link>
        </div>
      </el-col>
      <el-col :span="2">
        <FavButton :is-fav="audioInfo.isFav" @click="toggleFav" />
      </el-col>
      <el-col :offset="0" :span="12" class="time-slider-container">
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
        <BigIconButton
          :type="audio.isLoop ? 'primary' : 'default'"
          icon="el-icon-refresh-right"
          @click="audio.toggleLoop"
        />
        <BigIconButton
          :icon="isPlayed ? 'el-icon-video-pause' : 'el-icon-video-play'"
          @click="togglePlay"
        />
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
import { ref, computed, defineComponent, onMounted, watch } from 'vue'
import useHotKey, { HotKey } from 'vue3-hotkey'
import { useAudios, useTerminalOptions } from '../../store'
import BigIconButton from '/@/components/BigIconButton.vue'
import FavButton from '/@/components/FavButton.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'LayoutPlayer',
  components: {
    BigIconButton,
    FavButton,
  },
  setup() {
    const terminalOptions = useTerminalOptions()
    const isMobile = computed(
      () => terminalOptions.usingTerminal.value === 'mobile'
    )
    const audios = useAudios()
    const nowPos = ref(0)
    const audioInfo = computed(() => ({
      id: audios.id.value,
      time: audios.time.value,
      title: audios.title.value,
      userId: audios.userId.value,
      isFav: audios.isFav.value,
    }))
    const audio = computed(() => audios.audio.value!)
    const nowVol = ref(audio.value!.volume)
    const musicLength = computed(() => {
      return Math.ceil(audio.value.maxTime)
    })
    const isPlayed = computed(() => !audio.value!.isPaused)

    watch(
      () => audios.time.value,
      (nxt: number | null) => {
        if (nxt === null) {
          return
        }
        nowPos.value = nxt
      }
    )

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
    const toggleFav = async () => {
      try {
        await audios.updateFav(!audios.isFav.value)
      } catch (err) {
        ElMessage.error({
          type: 'error',
          message: `Toggle Fav failed !: ${err}`,
        })
      }
    }

    const composersLink = computed(() => `/users/${audioInfo.value.userId}`)

    const hotShort: HotKey[] = [
      {
        keys: ['space'],
        handler(_keys) {
          togglePlay()
        },
      },
    ]
    onMounted(() => {
      useHotKey(hotShort)()
    })
    // TODO: このパッケージ console.log でる
    // TODO: 検索実装するときにバグる気がする

    return {
      isMobile,
      audio,
      audioInfo,
      musicLength,
      nowPos,
      nowVol,
      onPosChange,
      onVolChange,
      isPlayed,
      togglePlay,
      formatPos,
      composersLink,
      toggleFav,
    }
  },
})
</script>

<style lang="scss" scoped>
.mobile-all-container {
  display: flex;
  .mobile-image {
    flex-shrink: 0;
  }
  .mobile-infos-container {
    display: flex;
    overflow: hidden;
    flex-grow: 2;
    flex-shrink: 2;
    .info-container {
      overflow: hidden;
      flex-shrink: 4;
      margin: auto 0;
      & > a {
        text-decoration-line: none;
        &:hover {
          text-decoration-line: underline;
        }
      }
      & > div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sound-title {
        font-size: 16px;
        line-height: 24px;
      }
      .sound-composer {
        font-size: 14px;
        line-height: 20px;
        color: #909399;
      }
    }
    .mobile-button-container {
      flex-shrink: 0;
      margin: {
        left: auto;
        top: auto;
        bottom: auto;
      }
      width: 82px;
    }
  }
}

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
        &:hover {
          text-decoration-line: underline;
        }
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
    & > button:first-child {
      margin-left: auto;
    }
  }
  .volume-slider {
    display: inline-block;
    width: 100%;
  }
}
</style>
