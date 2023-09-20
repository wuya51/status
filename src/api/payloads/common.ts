import type { ViewObj } from '../../types'

export const account_balance_payload = (address: string): ViewObj => ({
  function: '0x1::slow_wallet::balance',
  type_arguments: [],
  arguments: [address],
})

// export const account_balance_payload = (address: string): ViewObj => ({
//   function: '0x1::slow_wallet::unlocked_amount',
//   type_arguments: [],
//   arguments: [address],
// })
