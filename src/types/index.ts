import type { infra_balance } from "../api/payloads/system"

export interface IndexData {
  chain_id: number
  epoch: string
  ledger_version: string
  oldest_ledger_version: string
  ledger_timestamp: string
  node_role: string
  oldest_block_height: string
  block_height: string
  git_hash: string
}

export interface SystemInfo {
  fees: number | string
  epoch_duration: string
  chain_id: number
  epoch: string
  ledger_version: string
  oldest_ledger_version: string
  ledger_timestamp: string
  node_role: string
  oldest_block_height: string
  block_height: string
  git_hash: string
  infra_escrow: number
  vdf: number[]
}

export interface ProofOfFee {
  bidders: string[],
  bids: number[]
}
export interface ViewObj {
  function: string
  type_arguments: string[]
  arguments: any[]
}

export interface SlowWalletBalance {
  unlocked: number
  total: number
}
export interface UserAccount {
  // push(u: UserAccount): unknown
  address: string
  active_vouchers?: string[] // Array of addresses
  all_vouchers?: string[] // Array of addresses
  balance?: SlowWalletBalance
}

export interface valData {
  current_list: string[] // Array of addresses
  eligible_validators: string[] // Array of addresses
  current_profiles: UserAccount[]
}
