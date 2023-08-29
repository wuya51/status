import { writable, get } from 'svelte/store';
import { getView, getIndex } from '../api';
import type { Validator, ValidatorUniverse } from '../types';

import * as systemPayloads from '../api/payloads/system';
import * as validatorPayloads from '../api/payloads/validators';
import * as commonPayloads from '../api/payloads/common';
import type { IndexData } from '../types';

// Writable stores
export const validatorList = writable<[]>([]);
export const systemInfo = writable<object>({});
export const commonInfo = writable<object>({});
export const indexStore = writable<object>({});
export const indexDataStore = writable<IndexData | null>(null); 
export const validatorUniverse = writable<ValidatorUniverse>({
    current_validators: [],
    eligible_validators: [],
    validators: [],
  });

export const getIndexData = async () => {
    try {
      const data = await getIndex();
      indexDataStore.set(data);
    } catch (error) {
      console.error(`Failed to get index data: ${error}`);
    }
  };

export const setValidators = async () => {
    try {
      
      const currentUniverse = get(validatorUniverse);
      currentUniverse.validators = [];  // Clear previous data if needed

      const allValidatorsPayload = validatorPayloads.current_validators_payload;
      const allValidatorsResponse = await getView(allValidatorsPayload);
  
      for (const address of allValidatorsResponse) {
        // Fetch all vouchers
        const allVouchersPayload = validatorPayloads.validator_vouchers_payload(address);
        const allVouchersResponse = await getView(allVouchersPayload);
  
        // Fetch active vouchers
        const activeVouchersPayload = validatorPayloads.validator_valid_vouchers_payload(address);
        const activeVouchersResponse = await getView(activeVouchersPayload);
  
        // Fetch balance
        const balancePayload = commonPayloads.account_balance_payload(address);
        const balanceResponse = await getView(balancePayload);
  
        // Determine inactive vouchers
        const inactiveVouchers = allVouchersResponse.data.filter(
          voucher => !activeVouchersResponse.data.includes(voucher)
        );
  
        // Construct the Validator object
        const validator: Validator = {
          address,
          activeVouchers: activeVouchersResponse.data,
          inactiveVouchers,
          balance: balanceResponse.data,
        };
  
        currentUniverse.validators.push(validator);
      }
  
      validatorUniverse.set(currentUniverse);
  
    } catch (error) {
      console.error(`Failed to set validators: ${error}`);
    }
  };
  


export const getSystemInfo = async () => {
    try {
      const fees = await getView(systemPayloads.fees_collected_payload);
      const epoch = await getView(systemPayloads.epoch_length_payload);
      const indexData = get(indexDataStore);  // Get the current value of indexDataStore
      systemInfo.set({
        fees: fees?.data,
        epoch: epoch?.data,
        ...indexData  // Merge index data
      });
    } catch (error) {
      console.error(`Failed to get system info: ${error}`);
    }
  };

// Function to refresh all data
export const refresh = async () => {
  try {
    await setValidators();
    await getSystemInfo();

  } catch (error) {
    console.error(`Failed to refresh: ${error}`);
  }
};
