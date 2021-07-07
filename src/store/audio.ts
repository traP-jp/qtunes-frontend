import { InjectionKey, ref, Ref, UnwrapRef } from 'vue'
import { api } from '../utils/api'
import createAudioElement, { AudioElement } from '../utils/audio'

const audio: Ref<UnwrapRef<AudioElement> | null> = ref(null)
const id: Ref<string | null> = ref(null)
const title: Ref<string | null> = ref(null)
const userId: Ref<string | null> = ref(null)
const isFav: Ref<boolean | null> = ref(null)
const time: Ref<number | null> = ref(null)
const playAudio = (payload: {
  id: string
  title: string
  userId: string
  isFav: boolean
}) => {
  id.value = payload.id
  title.value = payload.title
  userId.value = payload.userId
  isFav.value = payload.isFav
  time.value = 0
  const loopFlag = audio.value !== null && audio.value.isLoop
  if (audio.value !== null) {
    audio.value.pause()
    audio.value.broke()
  }
  audio.value = ref(
    createAudioElement(id.value, {
      ended: () => {
        playRandom()
      },
      timeUpdate: (now: number) => {
        time.value = now
      },
    })
  ).value
  if (loopFlag !== audio.value.isLoop) {
    audio.value.toggleLoop()
  }
  audio.value.play()
}
const playAudioById = async (nxtId: string) => {
  const { data } = await api.getFile(nxtId)
  playAudio({
    id: data.id,
    title: data.title,
    userId: data.composer_name,
    isFav: data.is_favorite_by_me,
  })
}
const playRandom = async () => {
  const { data } = await api.getFileRandom()
  // const data = {
  //   id: `id ${Math.random()}`,
  //   title: `title ${Math.random()}`,
  //   composer_name: `user ${Math.random()}`,
  //   is_favorite_by_me: Math.random() > 0.5,
  // } // for test
  playAudio({
    id: data.id,
    title: data.title,
    userId: data.composer_name,
    isFav: data.is_favorite_by_me,
  })
}
const updateFav = async (nxt: boolean) => {
  if (id.value === null) {
    throw Error('file is not set !')
  }
  await api.putFileFavorite(id.value, nxt)
  isFav.value = nxt
}
export const audioStore = {
  audio,
  id,
  title,
  userId,
  isFav,
  time,
  playAudio,
  playAudioById,
  playRandom,
  updateFav,
}
export const audioKey: InjectionKey<typeof audioStore> = Symbol('audio')
