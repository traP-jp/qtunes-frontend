import { InjectionKey, readonly, Ref, ref } from 'vue'
import { Composer, ModelFile } from '../lib/apis/generated'
import { api } from '../utils/api'

const me: Ref<string | null> = ref(null)
const setMe = (value: string) => {
  me.value = value
}
const fetchMeFromStorage = () => {
  const val = sessionStorage.getItem('me')
  if (val === null) {
    return
  }
  me.value = val
}

const composers: Ref<Composer[] | null> = ref(null)
const fetchComposers = async () => {
  const { data } = await api.getComposers()
  composers.value = data
}

const favs: Ref<ModelFile[] | null> = ref(null)
const fetchFavs = async () => {
  const { data } = await api.getMyFavorites()
  favs.value = data
}

const files: Ref<ModelFile[] | null> = ref(null)
const fetchFiles = async () => {
  const { data } = await api.getFiles()
  files.value = data
}

const updateFavsFav = async (idx: number, nxt: boolean) => {
  if (favs.value === null) {
    throw Error('Favs is not set !')
  }
  await api.putFileFavorite(favs.value[idx].id, nxt)
  favs.value[idx].is_favorite_by_me = !favs.value[idx].is_favorite_by_me
}
const updateFilesFav = async (idx: number, nxt: boolean) => {
  if (files.value === null) {
    throw Error('Files is not set !')
  }
  await api.putFileFavorite(files.value[idx].id, nxt)
  files.value[idx].is_favorite_by_me = !files.value[idx].is_favorite_by_me
}

export const datasStore = {
  me: readonly(me),
  composers: readonly(composers),
  favs: readonly(favs),
  files: readonly(files),
  setMe,
  fetchMeFromStorage,
  fetchComposers,
  fetchFavs,
  fetchFiles,
  updateFavsFav,
  updateFilesFav,
}
export const datasKey: InjectionKey<typeof datasStore> = Symbol('datas')
