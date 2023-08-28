
## To Deploy
```
yarn
yarn build
yarn deploy

```

## To Dev
```
yarn
yarn dev

```

## To Do
### Add views

#### block info
[] epoch length in time: 0x1::block::get_epoch_interval_secs need to calculate - [here](https://github.com/0LNetworkCommunity/libra-framework/blob/f8c9ab8e39e27bc7f43b9327409e4203c8a709f4/framework/libra-framework/sources/block.move#L165)

[] block height: 0x1::block::get_current_block_height   - [here](https://github.com/0LNetworkCommunity/libra-framework/blob/f8c9ab8e39e27bc7f43b9327409e4203c8a709f4/framework/libra-framework/sources/block.move#L165)
#### balance info
[] validator balances: 0x1::slow_wallet::unlocked_amount  arg: address - [here](https://github.com/0LNetworkCommunity/libra-framework/blob/f8c9ab8e39e27bc7f43b9327409e4203c8a709f4/framework/libra-framework/sources/ol_sources/slow_wallet.move#L134)
[] Infra Escrow balance: 0x1::pledge_accounts - [here]() //Need a function to handle the infra escrow. maybe just balance 0x1

#### vouch
[] validator vouches: 0x1::vouch::get_buddies arg: address  - [here](https://github.com/0LNetworkCommunity/libra-framework/blob/f8c9ab8e39e27bc7f43b9327409e4203c8a709f4/framework/libra-framework/sources/ol_sources/vouch.move#L110)
[] validator valid vouches: 0x1::vouch::get_buddies_valid arg: address  - [here](https://github.com/0LNetworkCommunity/libra-framework/blob/f8c9ab8e39e27bc7f43b9327409e4203c8a709f4/framework/libra-framework/sources/ol_sources/vouch.move#L121C16-L121C33)

#### jail
[] validator is in jail: 0x1::jail::exists_jail arg: address  - [here](https://github.com/0LNetworkCommunity/libra-framework/blob/f8c9ab8e39e27bc7f43b9327409e4203c8a709f4/framework/libra-framework/sources/ol_sources/jail.move#L182)
[] validator jail rep: 0x1::jail::get_jail_reputation arg: address  - [here](https://github.com/0LNetworkCommunity/libra-framework/blob/f8c9ab8e39e27bc7f43b9327409e4203c8a709f4/framework/libra-framework/sources/ol_sources/jail.move#L182)
[] validator jail buddies: 0x1::jail::get_count_buddies_jailed arg: address  - [here](https://github.com/0LNetworkCommunity/libra-framework/blob/f8c9ab8e39e27bc7f43b9327409e4203c8a709f4/framework/libra-framework/sources/ol_sources/jail.move#L182)

#### Governance
[] eligible validators: 0x1::validator_universe::get_eligible_validators   - [here](https://github.com/search?q=repo%3A0LNetworkCommunity%2Flibra-framework++%23%5Bview%5D&type=code&p=2)
[] is a validators: 0x1::validator_universe::is_in_universe   - [here](https://github.com/search?q=repo%3A0LNetworkCommunity%2Flibra-framework++%23%5Bview%5D&type=code&p=2)



#### Validators

