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

export const validator_grade_payload = (address: string): ViewObj => ({
  function: '0x1::grade::get_validator_grade',
  type_arguments: [],
  arguments: [address],
})

export const all_vouchers_payload = (address: string): ViewObj => ({
  function: '0x1::vouch::all_vouchers',
  type_arguments: [],
  arguments: [address],
})

export const vouchers_valid = (address: string): ViewObj => ({
  function: '0x1::vouch::true_friends',
  type_arguments: [],
  arguments: [address],
})

export const vouchers_in_val_set_payload = (address: string): ViewObj => ({
  function: '0x1::proof_of_fee::get_valid_vouchers_in_set',
  type_arguments: [],
  arguments: [address],
})
