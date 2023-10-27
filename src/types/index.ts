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
  validator_seats: number
  vdf: number[]
  boundary_status: object
}

export interface ProofOfFee {
  bidders: string[]
  bids: number[]
  qualified: string[]
}
export interface ViewObj {
  function: string
  type_arguments: string[]
  arguments: string[] | boolean[]
}

export interface SlowWalletBalance {
  unlocked: number
  total: number
}
export interface UserAccount {
  address: string
  active_vouchers?: string[]
  valid_vouchers?: string[]
  all_vouchers?: string[]
  balance?: SlowWalletBalance
}

export interface valData {
  current_list: string[]
  eligible_validators: string[]
  current_profiles: UserAccount[]
}
