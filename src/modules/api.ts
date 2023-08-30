import axios from 'axios'

export interface ViewObj {
  function: string
  type_arguments: string[]
  arguments: string[]
}

export const URL_DEBUG: string = 'http://134.209.32.159'
export const API_BASE: string = ':8080/v1/'

export const makeUrl = (): string => {
  return URL_DEBUG.concat(API_BASE)
}
export const api = axios.create({
  baseURL: makeUrl(),
})

export const getView = async (payload: ViewObj) => {
  return api.post('/view', payload).then((r) => r.data)
}
