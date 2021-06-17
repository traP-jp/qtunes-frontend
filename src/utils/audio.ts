import { computed, ref, watch } from 'vue'

interface AudioElementOptions {
  ended: () => void
  timeUpdate: (afterTime: number) => void
}

const createAudioElement = (id: string, options: AudioElementOptions) => {
  const nowAudio = ref(new Audio('http://www.hmix.net/music/n/n148.mp3')) // TODO: api

  nowAudio.value.load()

  const isPaused = ref(nowAudio.value.paused)
  const play = () => {
    isPaused.value = false
    nowAudio.value.play()
  }
  const pause = () => {
    isPaused.value = true
    nowAudio.value.pause()
  }

  const volume = ref(Math.floor(nowAudio.value.volume) * 100)
  const setVolume = (nxtVolume: number) => {
    volume.value = nxtVolume
    nowAudio.value.volume = nxtVolume / 100
  }

  const time = computed(() => nowAudio.value.currentTime)

  const maxTime = ref(nowAudio.value.duration)
  nowAudio.value.addEventListener('durationchange', (_event) => {
    maxTime.value = nowAudio.value.duration
  })

  const setTime = (nxtTime: number) => {
    nowAudio.value.currentTime = nxtTime
  }

  nowAudio.value.addEventListener('timeupdate', (_event) => {
    options.timeUpdate(nowAudio.value.currentTime)
  })
  nowAudio.value.addEventListener('ended', (_event) => {
    options.ended()
  })

  return {
    play,
    pause,
    isPaused,
    setVolume,
    setTime,
    time,
    maxTime,
    volume,
  }
}

export default createAudioElement
