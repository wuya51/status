import type { ViewObj } from '../../types'

export const current_validators_payload: ViewObj = {
  function: '0x1::stake::get_current_validators',
  type_arguments: [],
  arguments: [],
}

export const eligible_validators_payload: ViewObj = {
  function: '0x1::validator_universe::get_eligible_validators',
  type_arguments: [],
  arguments: [],
}

export const all_vouchers_payload = (address: string): ViewObj => ({
  function: '0x1::vouch::get_buddies',
  type_arguments: [],
  arguments: [address],
})

export const vouchers_in_val_set_payload = (address: string): ViewObj => ({
  function: '0x1::vouch::get_buddies_valid',
  type_arguments: [],
  arguments: [address],
})
