import type { ViewObj } from '../../types';

export const current_validators_payload: ViewObj = {
  function: '0x1::stake::get_current_validators',
  type_arguments: [],
  arguments: [],
};

export const eligible_validators_payload: ViewObj = {
  function: '0x1::validator_universe::get_eligible_validators',
  type_arguments: [],
  arguments: [],
}

export const validator_vouchers_payload = (address: string): ViewObj => ({
  function: '0x1::vouch::get_buddies',
  type_arguments: ['address'],
  arguments: [address],  // Use the dynamic argument
});

export const validator_valid_vouchers_payload = (address: string): ViewObj => ({
  function: '0x1::vouch::get_buddies_valid',
  type_arguments: ['address'],
  arguments: [address],  // Use the dynamic argument
});