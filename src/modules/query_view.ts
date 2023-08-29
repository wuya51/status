import { writable } from 'svelte/store'
import type { ViewObj } from './api'

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
