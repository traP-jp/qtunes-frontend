import { inject, provide } from 'vue'
import { audioKey, audioStore } from './audio'
import { datasKey, datasStore } from './datas'

export const provideAudios = () => {
  provide(audioKey, audioStore)
}
export const provideDatas = () => {
  provide(datasKey, datasStore)
}
export const useAudios = () => {
  const store = inject(audioKey)
  if (store === undefined) {
    throw Error('Audios is not provided')
  }
  return store
}
export const useDatas = () => {
  const store = inject(datasKey)
  if (store === undefined) {
    throw Error('Datas is not provided')
  }
  return store
}
