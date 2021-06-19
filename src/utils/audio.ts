import { ref } from 'vue'

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

  nowAudio.value.addEventListener('timeupdate', (_event) => {
    options.timeUpdate(nowAudio.value.currentTime)
  })
  nowAudio.value.addEventListener('ended', (_event) => {
    if (isLoop.value) {
      setTime(0)
      play()
      return
    }
    options.ended()
  })

  const broke = () => {
    nowAudio.value.pause()
    nowAudio.value.removeEventListener('durationchange', (_event) => {
      maxTime.value = nowAudio.value.duration
    })
    nowAudio.value.removeEventListener('timeupdate', (_event) => {
      options.timeUpdate(nowAudio.value.currentTime)
    })
    nowAudio.value.removeEventListener('ended', (_event) => {
      console.log('end')
      if (isLoop.value) {
        setTime(0)
        play()
        return
      }
      options.ended()
    })
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
