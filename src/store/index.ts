import { writable, get } from 'svelte/store'
import moment from 'moment'
import { getView, getIndex } from '../api'
import type { Validator, ValidatorUniverse, IndexData, SystemInfo } from '../types'
import * as systemPayloads from '../api/payloads/system'
import * as validatorPayloads from '../api/payloads/validators'
import * as commonPayloads from '../api/payloads/common'
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage'

// Initialize from local storage
const initialValidatorUniverse = loadFromLocalStorage('validatorUniverse') || {
  current_validators: [],
  eligible_validators: [],
  validators: [],
}

const initialSystemInfo = loadFromLocalStorage('systemInfo') || null

// Writable stores
export const validatorList = writable<[]>([])
export const systemInfo = writable<SystemInfo | null>(initialSystemInfo)
export const commonInfo = writable<object>({})
export const indexStore = writable<object>({})
export const indexDataStore = writable<IndexData | null>(null)
export const validatorUniverse = writable<ValidatorUniverse>(initialValidatorUniverse)

export const getIndexData = async () => {
  try {
    const data = await getIndex()
    indexDataStore.set(data)
  } catch (error) {
    console.error(`Failed to get index data: ${error}`)
  }
}

// Subscribe to changes
validatorUniverse.subscribe((value) => {
  saveToLocalStorage('validatorUniverse', value)
})

systemInfo.subscribe((value) => {
  saveToLocalStorage('systemInfo', value)
})

export const setValidators = async () => {
  try {
    const currentUniverse = get(validatorUniverse)

    currentUniverse.validators = [] // Clear previous data if needed

    const eligibleValidatorsPayload = validatorPayloads.eligible_validators_payload

    const eligibleValidatorsResponse = await getView(eligibleValidatorsPayload)

    currentUniverse.eligible_validators = eligibleValidatorsResponse

    const allValidatorsPayload = validatorPayloads.current_validators_payload

    const allValidatorsResponse = await getView(allValidatorsPayload)

    for (const address of allValidatorsResponse[0]) {
      // Fetch all vouchers
      const allVouchersPayload = validatorPayloads.validator_vouchers_payload(address)
      const allVouchersResponse = await getView(allVouchersPayload)

      // Fetch active vouchers
      const activeVouchersPayload = validatorPayloads.validator_valid_vouchers_payload(address)
      const activeVouchersResponse = await getView(activeVouchersPayload)

      // Fetch balance
      const balancePayload = commonPayloads.account_balance_payload(address)
      const balanceResponse = await getView(balancePayload)

      // Determine inactive vouchers
      const inactiveVouchers = allVouchersResponse.data?.filter(
        (voucher) => !activeVouchersResponse.data.includes(voucher),
      )

      // Construct the Validator object
      const validator: Validator = {
        address,
        activeVouchers: activeVouchersResponse.data,
        inactiveVouchers,
        balance: balanceResponse.data || 0,
      }

      currentUniverse.validators.push(validator)
    }

    validatorUniverse.set(currentUniverse)

    // Save to local storage
    saveToLocalStorage('validatorUniverse', currentUniverse)
  } catch (error) {
    console.error(`Failed to set validators: ${error}`)
  }
}

export const getSystemInfo = async () => {
  try {
    // TODO(zoz): it would be better to let these be async and parallel
    const fees = await getView(systemPayloads.fees_collected_payload)
    const epochResponse = await getView(systemPayloads.epoch_length_payload)
    const vdfDifficulty = await getView(systemPayloads.vdf_difficulty)

    const duration = moment.duration(Number(epochResponse[0]), 'seconds') // Cast to Number
    const epoch = `${Math.floor(duration.asHours())} hrs : ${duration.minutes()} mins`
    const indexData = get(indexDataStore)

    // TODO(zoz): make this an interface
    const newSystemInfo = {
      fees: fees[0],
      epoch_duration: epoch,
      vdf: vdfDifficulty,
      ...indexData,
    }

    systemInfo.set(newSystemInfo)

    // Save to local storage
    saveToLocalStorage('systemInfo', newSystemInfo)
  } catch (error) {
    console.error(`Failed to get system info: ${error}`)
  }
}

// Function to refresh all data
export const refresh = async () => {
  try {
    // this should be done async, without the await
    getIndexData()
    getSystemInfo()
    setValidators()
  } catch (error) {
    console.error(`Failed to refresh: ${error}`)
  }
}
