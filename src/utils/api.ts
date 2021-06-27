import axios, { AxiosPromise } from 'axios'
import { Code, Composer, ModelFile, User, UserMe } from '../lib/apis/generated'

export const traQBaseURL = 'https://q.trap.jp/api/v3'
// export const api = new Apis(
//   new Configuration({
//     basePath: '/api',
//   })
// )
export class Apis {
  getUsers(): AxiosPromise<User[]> {
    return axios.get('/api/users')
  }

  getUser(id: string): AxiosPromise<User> {
    return axios.get(`/api/users/${id}`)
  }

  getMe(): AxiosPromise<UserMe> {
    return axios.get('/api/users/me')
  }

  getMyFavorites(): AxiosPromise<ModelFile[]> {
    return axios.get('/api/users/me/favorites')
  }

  getComposers(): AxiosPromise<Composer[]> {
    return axios.get('/api/composers')
  }

  getComposer(id: string): AxiosPromise<Composer> {
    return axios.get(`/api/composers/${id}`)
  }

  getComposerByName(name: string): AxiosPromise<Composer> {
    return axios.get(`/api/composers/name/${name}`)
  }

  getComposerFiles(id: string): AxiosPromise<ModelFile[]> {
    return axios.get(`/api/composers/${id}/files`)
  }

  getFiles(): AxiosPromise<ModelFile[]> {
    return axios.get('/api/files')
  }

  getFileRandom(): AxiosPromise<ModelFile> {
    return axios.get('/api/files/random')
  }

  getFile(id: string): AxiosPromise<ModelFile> {
    return axios.get(`/api/files/${id}`)
  }

  putFileFavorite(id: string, favorite: boolean): AxiosPromise<void> {
    return axios.put(`/api/files/${id}/favorite`, {
      favorite,
    })
  }

  getGeneratedCode(): AxiosPromise<Code> {
    return axios.get('/api/oauth/generate/code')
  }

  callback(code: string): AxiosPromise<void> {
    return axios.get(`/api/oauth/callback?code=${code}`)
  }

  postLogout(): AxiosPromise<void> {
    return axios.post('/api/oauth/logout')
  }

  downloadFileLink(id: string): string {
    return `/api/files/${id}/download`
  }
}
export const api = new Apis()

export const redirect2AuthEndpoint = async () => {
  const oauthParam = (await api.getGeneratedCode()).data
  const authorizationEndpointUrl = new URL(`${traQBaseURL}/oauth2/authorize`)

  const searchParams = new URLSearchParams()
  searchParams.set('response_type', oauthParam.responseType)
  searchParams.set('client_id', oauthParam.clientID)
  searchParams.set('code_challenge', oauthParam.codeChallenge)
  searchParams.set('code_challenge_method', oauthParam.codeChallengeMethod)
  authorizationEndpointUrl.search = searchParams.toString()

  window.location.assign(authorizationEndpointUrl.toString())
}
