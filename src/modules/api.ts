import axios from 'axios'

export const URL_DEBUG: string = '134.209.32.159'
export const API_BASE: string = ':8080/v1/'

export const makeUrl = (): string => {
  return URL_DEBUG.concat(API_BASE)
}

const api = axios.create({
  baseURL: makeUrl(),
})

export const getIndex = (): object => {
  return api.get('/')
}
