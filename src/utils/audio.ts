import { ref } from 'vue'
import { api } from './api'

interface AudioElementOptions {
  ended: () => void
  timeUpdate: (afterTime: number) => void
}

export type AudioElement = ReturnType<typeof createAudioElement>
const createAudioElement = (id: string, options: AudioElementOptions) => {
  const audio = new Audio(api.downloadFileLink(id))
  // const audio = new Audio('http://www.hmix.net/music/n/n148.mp3') // for test

  audio.load()

  const isPaused = ref(audio.paused)
  const play = () => {
    isPaused.value = false
    audio.play()
  }
  const pause = () => {
    isPaused.value = true
    audio.pause()
  }

  const isLoop = ref(audio.loop)
  const toggleLoop = () => {
    isLoop.value = !isLoop.value
  }

  const parseVol = (x: number) => {
    if (Number.isNaN(x)) {
      x = 100
    } else if (x < 0) {
      x = 0
    } else if (x > 100) {
      x = 100
    }
    return (x * x) / 10000
  }
  const volume = ref(Math.floor(audio.volume ** 0.5 * 100))
  const localVol = localStorage.getItem('volume')
  if (localVol !== null) {
    volume.value = !Number.isNaN(Number(localVol))
      ? Number(localVol)
      : volume.value
    audio.volume = parseVol(volume.value)
  }
  const setVolume = (nxtVolume: number) => {
    volume.value = nxtVolume
    audio.volume = parseVol(nxtVolume)
    localStorage.setItem('volume', String(nxtVolume))
  }

  const maxTime = ref(audio.duration)
  audio.addEventListener('durationchange', (_event) => {
    maxTime.value = audio.duration
  })

  const setTime = (nxtTime: number) => {
    audio.currentTime = nxtTime
  }

  const timeUpdateHandler = (_event: Event) => {
    options.timeUpdate(audio.currentTime)
  }
  const endedHandler = (_event: Event) => {
    if (isLoop.value) {
      setTime(0)
      play()
      return
    }
    options.ended()
  }

  audio.addEventListener('timeupdate', timeUpdateHandler)
  audio.addEventListener('ended', endedHandler)

  const broke = () => {
    audio.pause()
    audio.removeEventListener('durationchange', (_event) => {
      maxTime.value = audio.duration
    })
    audio.removeEventListener('timeupdate', timeUpdateHandler)
    audio.removeEventListener('ended', endedHandler)
  }

  return {
    play,
    pause,
    isPaused,
    toggleLoop,
    isLoop,
    setVolume,
    volume,
    setTime,
    maxTime,
    broke,
  }
}

export default createAudioElement
