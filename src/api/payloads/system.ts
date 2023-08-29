import type { ViewObj } from '../../types';

export const fees_collected_payload: ViewObj = {
  function: '0x1::transaction_fee::system_fees_collected',
  type_arguments: [],
  arguments: [],
};

export const epoch_length_payload: ViewObj = {
  function: '0x1::block::get_epoch_interval_secs',
  type_arguments: [],
  arguments: [],
};