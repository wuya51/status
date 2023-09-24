import { writable, get } from 'svelte/store'
import moment from 'moment'
import { postViewFunc, getIndex, getAccountResource } from '../api'
import type { UserAccount, valData, IndexData, SystemInfo, ProofOfFee } from '../types'
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

export interface User {
  address: string
}

const initialSystemInfo = loadFromLocalStorage('systemInfo')
// const initialUser = loadFromLocalStorage('selectedUser')

// Writable stores
export const validatorList = writable<[]>([])
export const systemInfo = writable<SystemInfo>(initialSystemInfo)
export const pofInfo = writable<ProofOfFee>()

export const commonInfo = writable<object>({})
export const indexStore = writable<object>({})
export const indexDataStore = writable<IndexData>()
export const valDataStore = writable<valData>(initialValidatorUniverse)
export const selectedAccount = writable<User>()

export const setAccount = (a: User) => {
  selectedAccount.set(a)
  saveToLocalStorage('selectedUser', a)
}

export const getIndexData = async () => {
  try {
    const data = await getIndex()
    indexDataStore.set(data)
  } catch (error) {
    console.error(`Failed to get index data: ${error}`)
  }
}

// Subscribe to changes
valDataStore.subscribe((value) => {
  saveToLocalStorage('validatorUniverse', value)
})

systemInfo.subscribe((value) => {
  saveToLocalStorage('systemInfo', value)
})

// export const getValidatorsOld = async () => {
//   try {
//     const currentUniverse = get(valDataStore)

//     currentUniverse.current_profiles = [] // Clear previous data if needed

//     const eligibleValidatorsPayload = validatorPayloads.eligible_validators_payload

//     const eligibleValidatorsResponse = await getView(eligibleValidatorsPayload)

//     currentUniverse.eligible_validators = eligibleValidatorsResponse[0]

//     const allValidatorsPayload = validatorPayloads.current_validators_payload

//     const allValidatorsResponse: string[] = await getView(allValidatorsPayload)
//     console.log('allValidatorsResponse', JSON.stringify(allValidatorsResponse[0]))

//     for (const address of allValidatorsResponse[0]) {
//       console.log('address', address)
//       // Fetch all vouchers
//       const allVouchersPayload = validatorPayloads.all_vouchers_payload(address)
//       const allVouchersResponse = await getView(allVouchersPayload)
//       console.log(JSON.stringify(allVouchersResponse))
//       // Fetch active vouchers
//       const activeVouchersPayload = validatorPayloads.vouchers_in_val_set_payload(address)
//       const activeVouchersResponse = await getView(activeVouchersPayload)

//       // Fetch balance
//       const balancePayload = commonPayloads.account_balance_payload(address)
//       const balanceResponse = await getView(balancePayload)

//       // Determine inactive vouchers
//       const inactiveVouchers = allVouchersResponse.data?.filter(
//         (voucher) => !activeVouchersResponse.data.includes(voucher),
//       )

//       // Construct the Validator object
//       const validator: UserAccount = {
//         address,
//         active_vouchers: activeVouchersResponse.data,
//         all_vouchers: inactiveVouchers,
//         balance: balanceResponse.data,
//       }

//       currentUniverse.current_profiles.push(validator)
//     }

//     valDataStore.set(currentUniverse)

//     // Save to local storage
//     saveToLocalStorage('validatorUniverse', currentUniverse)
//   } catch (error) {
//     console.error(`Failed to set validators: ${error}`)
//   }
// }

export const getValidators = async () => {
  const requests = [
    postViewFunc(validatorPayloads.eligible_validators_payload),
    postViewFunc(validatorPayloads.current_validators_payload),
  ]

  const [eligible, active_set] = await Promise.all(requests)
  const profiles = await fetchUserAccounts(active_set[0])

  valDataStore.update((d) => {
    d.eligible_validators = eligible[0]
    d.current_list = active_set[0]
    d.current_profiles = profiles
    return d
  })
}

export const fetchUserAccounts = async (accounts: string[]): Promise<UserAccount[]> => {
  if (accounts.length == 0) throw 'no accounts'

  const accountsData: UserAccount[] = []
  for (const a of accounts) {
    const requests = [
      postViewFunc(validatorPayloads.all_vouchers_payload(a)),
      postViewFunc(validatorPayloads.vouchers_in_val_set_payload(a)),
      postViewFunc(commonPayloads.account_balance_payload(a)),
    ]

    const [buddies_res, buddies_in_set_res, bal_res] = await Promise.all(requests)

    const u: UserAccount = {
      address: a,
      active_vouchers: buddies_in_set_res[0],
      all_vouchers: buddies_res[0],
      balance: {
        unlocked: bal_res[0],
        total: bal_res[1],
      },
    }

    accountsData.push(u)
  }

  return accountsData
}

export const getSystemInfo = async () => {
  try {
    // TODO(zoz): it would be better to let these be async and parallel
    const requests = [
      postViewFunc(systemPayloads.fees_collected_payload),
      postViewFunc(systemPayloads.epoch_length_payload),
      postViewFunc(systemPayloads.vdf_difficulty),
      postViewFunc(systemPayloads.infra_balance),
      postViewFunc(systemPayloads.getPoFBidders(true)),
      postViewFunc(systemPayloads.getPoFBidders(false)),
      getAccountResource('0x1', '0x1::musical_chairs::Chairs'),
      getAccountResource('0x1', '0x1::epoch_boundary::BoundaryStatus'),
    ]
    const [
      fees,
      epochResponse,
      vdfDifficulty,
      infraBalance,
      pofBiddersFiltered,
      pofBidders,
      chairs,
      boundaryStatus,
    ] = await Promise.all(requests)

    const duration = moment.duration(Number(epochResponse[0]), 'seconds') // Cast to Number
    const epoch = `${Math.floor(duration.asHours())} hrs : ${duration.minutes()} mins`
    const indexData = get(indexDataStore)

    // TODO(zoz): make this an interface
    const newSystemInfo: SystemInfo = {
      fees: fees[0],
      epoch_duration: epoch,
      vdf: vdfDifficulty,
      infra_escrow: infraBalance[0],
      validator_seats: chairs.data.current_seats,
      boundary_status: boundaryStatus,
      ...indexData,
    }

    const pof: ProofOfFee = {
      bidders: pofBidders[0],
      bids: pofBidders[1],
      qualified: pofBiddersFiltered[0],
    }

    systemInfo.set(newSystemInfo)
    pofInfo.set(pof)
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
    getValidators()
  } catch (error) {
    console.error(`Failed to refresh: ${error}`)
  }
}
