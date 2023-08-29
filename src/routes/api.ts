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


export const setValidators = async () => {
  const response = await getView(current_validators_payload);
  validatorList.set(response?.data[0]);
}


export const getView = async (payload: ViewObj) => {
  return api.post('/view', payload).then((r) => {
    return r.data
  })
}

//View Objects

//System
const fees_collected_payload: ViewObj = {
  function: '0x1::transaction_fee::system_fees_collected',
  type_arguments: [],
  arguments: [],
}

// needs to be converted to hrs:mins
const epoch_length_payload: ViewObj = {
  function: '0x1::block::get_epoch_interval_secs',
  type_arguments: [],
  arguments: [],
}

const block_height_payload: ViewObj = {
  function: '0x1::block::get_current_block_height',
  type_arguments: [],
  arguments: [],
}

//Validators
const current_validators_payload: ViewObj = {
  function: '0x1::stake::get_current_validators',
  type_arguments: [],
  arguments: [],
}

const eligible_validators_payload: ViewObj = {
  function: '0x1::validator_universe::get_eligible_validators',
  type_arguments: [],
  arguments: [],
}

const validator_vouchers_payload: ViewObj = {
  function: '0x1::vouch::get_buddies',
  type_arguments: ['address'],
  arguments: [],
}

const validator_valid_vouchers_payload: ViewObj = {
  function: '0x1::vouch::get_buddies_valid',
  type_arguments: ['address'],
  arguments: [],
}



//Common
const account_balance_payload: ViewObj = {
  function: '0x1::slow_wallet::unlocked_amount',
  type_arguments: ['address'],
  arguments: [],
}






export const refresh = () => {
  getIndex()
  getValidators()
  // ... add more views here
}

export const validatorList = writable<[]>()
export const indexStore = writable<object>()
