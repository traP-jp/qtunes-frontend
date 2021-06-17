<template>
  <div>
    <el-button class="big-icon-button" plain circle @click="togglePlay">
      <i
        :class="`${
          isPlayed ? 'el-icon-video-pause' : 'el-icon-video-play'
        } big-icon`"
      />
    </el-button>
    <el-slider
      v-model.number="nowVol"
      :step="1"
      :min="0"
      :max="100"
      class="volume-slider"
      @change="onVolChange"
    />
    <div class="time-slider-container">
      <el-row class="time-slider-with-msg">
        <el-col class="time-msg">{{ formatPos(nowPos) }}</el-col>
        <el-col class="time-slider-col">
          <el-slider
            v-model.number="nowPos"
            :step="1"
            :min="0"
            :max="Number.isNaN(musicLength) ? 100 : musicLength"
            :format-tooltip="formatPos"
            class="time-slider"
            @change="onPosChange"
          />
        </el-col>
        <el-col class="time-msg">{{ formatPos(musicLength) }}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import createAudioElement from '../../utils/audio'
import { ref } from 'vue'

export default defineComponent({
  name: 'LayoutPlayer',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    console.log('setup')
    const nowPos = ref(0)
    const audio = ref(
      createAudioElement('', {
        ended: () => {
          console.log('end!')
        },
        timeUpdate: (time: number) => {
          nowPos.value = time
        },
      })
    )
    const nowVol = ref(audio.value.volume)
    const musicLength = computed(() => {
      console.log(audio.value.maxTime)
      return Math.floor(audio.value.maxTime)
    })
    const isPlayed = computed(() => !audio.value.isPaused)

    const onPosChange = (event: number) => {
      audio.value.setTime(event)
    }
    const onVolChange = (event: number) => {
      audio.value.setVolume(event)
    }

    const formatPos = (val: number) => {
      if (Number.isNaN(val)) {
        return '-'
      }
      const floorVal = Math.floor(val)
      const minute = (floorVal / 60) | 0
      const second = floorVal % 60
      return `${minute}:${('00' + second).slice(-2)}`
    }

    const togglePlay = () => {
      isPlayed.value ? audio.value.pause() : audio.value.play()
    }

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
    }
  },
})
</script>

<style lang="scss" scoped>
.volume-slider {
  display: inline-block;
  width: 20%;
}
.big-icon-button {
  padding: 0 !important;
  border: 0 !important;
  & > span > i {
    font-size: 2rem;
  }
}
.time-slider-container {
  text-align: center;
  .time-slider-with-msg {
    width: 60%;
    display: inline-block;
    .time-msg {
      width: 4rem;
      line-height: 42px;
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
</style>
