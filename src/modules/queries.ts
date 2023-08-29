import { writable } from "svelte/store"
import { api, type ViewObj } from "../modules/api"


// get the index with metadata
export const indexStore = writable<object>()
export const getIndex = async () => {
  return api.get('').then((r) => {
    indexStore.set(r.data)
    r.data
  })
}

// get the validator list
export const validatorList = writable<[]>()
export const VALIDATOR_PAYLOAD: ViewObj = {
  function: '0x1::stake::get_current_validators',
  type_arguments: [],
  arguments: [],
}

// get the vdf difficulty
export const vdfDifficulty = writable<[]>()
export const VDF_DIFFICULTY: ViewObj = {
  function: '0x1::tower_state::get_difficulty',
  type_arguments: [],
  arguments: [],
}


