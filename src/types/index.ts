export interface IndexData {
  chain_id: number;
  epoch: string;
  ledger_version: string;
  oldest_ledger_version: string;
  ledger_timestamp: string;
  node_role: string;
  oldest_block_height: string;
  block_height: string;
  git_hash: string;
}

export interface ViewObj {
    function: string,
    type_arguments: string[],
    arguments: string[],
}

export interface Validator {
  address: string;
  activeVouchers: string[];  // Array of addresses
  inactiveVouchers: string[];  // Array of addresses
  balance: number;
}

export interface ValidatorUniverse {
  current_validators: string[];  // Array of addresses
  eligible_validators: string[];  // Array of addresses
  validators: Validator[];
}

