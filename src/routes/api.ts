import axios from 'axios'
import { writable } from 'svelte/store'


interface ViewObj {
  function: string,
  type_arguments: string[],
  arguments: string[],
}

export const URL_DEBUG: string = 'http://134.209.32.159'
export const API_BASE: string = ':8080/v1/'

export const makeUrl = (): string => {
  return URL_DEBUG.concat(API_BASE)
}
export const api = axios.create({
  baseURL: makeUrl(),
})

export const getIndex = async () => {
  return api.get('').then((r) => {
    indexStore.set(r.data)
    r.data
  })
}



const validator_payload: ViewObj = {
  function: '0x1::stake::get_current_validators',
  type_arguments: [],
  arguments: [],
}

export const getView = async (payload: ViewObj) => {
  return api.post('/view', payload).then((r) => {
    console.log(r)
    validatorList.set(r.data[0])
    r.data
  })
}

export const refresh = () => {
  getIndex()
  getView(validator_payload)
  // ... add more views here
}

export const validatorList = writable<[]>()
export const indexStore = writable<object>()
