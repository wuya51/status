import axios from 'axios'
export const URL_DEBUG: string = 'http://134.209.32.159'
export const API_BASE: string = ':8080/v1/'

export const makeUrl = (): string => {
  return URL_DEBUG.concat(API_BASE)
}
export const api = axios.create({
  baseURL: makeUrl(),
})

export const getIndex = async () => {
  return api.get("")
  .then(r => r.data)
}
