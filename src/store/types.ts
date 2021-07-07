import { Composer, ModelFile } from '../lib/apis/generated'

export interface RootState {}

export interface AudioState {
  id: string
  title: string
  userId: string
  isFav: boolean
}

export interface DatasState {
  composers: Composer[] | null
  favs: ModelFile[] | null
  files: ModelFile[] | null
}

export interface File {
  id: string
  title: string
  userId: string
  isFav: boolean
  createdAt?: string
}
