import { ref } from 'vue'
import { api } from './api'

interface AudioElementOptions {
  ended: () => void
  timeUpdate: (afterTime: number) => void
}

const createAudioElement = (id: string, options: AudioElementOptions) => {
  const nowAudio = ref(new Audio(api.downloadFileLink(id)))

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

  const isLoop = ref(nowAudio.value.loop)
  const toggleLoop = () => {
    isLoop.value = !isLoop.value
  }

  const volume = ref(Math.floor(nowAudio.value.volume) * 100)
  const setVolume = (nxtVolume: number) => {
    volume.value = nxtVolume
    nowAudio.value.volume = nxtVolume / 100
  }

  const maxTime = ref(nowAudio.value.duration)
  nowAudio.value.addEventListener('durationchange', (_event) => {
    maxTime.value = nowAudio.value.duration
  })

  const time = ref(nowAudio.value.currentTime)
  const setTime = (nxtTime: number) => {
    time.value = nxtTime
    nowAudio.value.currentTime = nxtTime
  }

  const timeUpdateHandler = (_event: Event) => {
    options.timeUpdate(nowAudio.value.currentTime)
  }
  const endedHandler = (_event: Event) => {
    if (isLoop.value) {
      setTime(0)
      play()
      return
    }
    options.ended()
  }

  nowAudio.value.addEventListener('timeupdate', timeUpdateHandler)
  nowAudio.value.addEventListener('ended', endedHandler)

  const broke = () => {
    nowAudio.value.pause()
    nowAudio.value.removeEventListener('durationchange', (_event) => {
      maxTime.value = nowAudio.value.duration
    })
    nowAudio.value.removeEventListener('timeupdate', timeUpdateHandler)
    nowAudio.value.removeEventListener('ended', endedHandler)
  }

  return {
    play,
    pause,
    isPaused,
    toggleLoop,
    isLoop,
    setVolume,
    setTime,
    time,
    maxTime,
    volume,
    broke,
  }
}

export default createAudioElement
