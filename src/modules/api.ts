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



const VALIDATOR_PAYLOAD: ViewObj = {
  function: '0x1::stake::get_current_validators',
  type_arguments: [],
  arguments: [],
}

const VDF_DIFFICULTY: ViewObj = {
  function: '0x1::tower_state::get_difficulty',
  type_arguments: [],
  arguments: [],
}

export const getView = async (payload: ViewObj) => {
  return api.post('/view', payload).then((r) => r.data)
}

export const refresh = () => {
  getIndex()
  getView(VALIDATOR_PAYLOAD)
    .then((r) => validatorList.set(r[0]))
  getView(VDF_DIFFICULTY)
    .then((r) => vdfDifficulty.set(r))
  // ... add more views here
}

export let validatorList = writable<[]>()
export let vdfDifficulty = writable<[]>()
export let indexStore = writable<object>()
