<script lang="ts">
  import { postViewFunc } from '../api'
  import { account_balance_payload } from '../api/payloads/common'
  import { getPoFErrors } from '../api/payloads/system'
  import {
    validator_bid_payload,
    validator_grade_payload,
    vouchers_in_val_set_payload,
  } from '../api/payloads/validators'
  import { setAccount, systemInfo } from '../store'
  import type { UserAccount } from '../types'
  import { mapPoFErrors } from '../types/proof_of_fee'
  import { scaleCoin } from '../utils/coin'

  export let profiles: UserAccount[] = []

  const getErrors = async (addr: string): Promise<string[]> => {
    return postViewFunc(getPoFErrors(addr)).then((res) => {
      return mapPoFErrors(res[0])
    })
  }
</script>

<main>
  <table class="uk-table uk-table-responsive uk-table-divider">
    <thead>
      <tr>
        <th>Address</th>
        <th>In Set</th>
        <th>Bid : Entry Fee</th>
        <th>Active Vouchers</th>
        <th>Balance (Locked)</th>
        <th>Proposing: success / fail</th>
        <th>Qualification Errors</th>
      </tr>
    </thead>
    <tbody>
      {#if profiles.length > 0}
        {#each profiles as a}
          <tr>
            <td>
              <button
                on:click={() => setAccount(a.address)}
                class="uk-button
            uk-button-link"
              >
                {a.address.slice(0, 5)}
              </button></td
            >

            <td>
              {a.in_val_set}
            </td>
            <td>
              {#await postViewFunc(validator_bid_payload(a.address))}
                ...
              {:then res}
                {res[0] / 10}% : {scaleCoin((res[0] / 1000) * $systemInfo.consensus_reward) }
              {/await}
            </td>
            <!-- <td>{(a.all_vouchers && a.all_vouchers.length) || 'no buddies'}</td> -->

            <td>
              {#await postViewFunc(vouchers_in_val_set_payload(a.address))}
                ...
              {:then res}
                {res[0].length}
              {/await}
            </td>

            <td>
              {#await postViewFunc(account_balance_payload(a.address))}
                ...
              {:then res}
                {scaleCoin(res[0])} ({scaleCoin(res[1])})
              {/await}
            </td>

            <td>
              {#await postViewFunc(validator_grade_payload(a.address))}
                ...
              {:then res}
                {res[0]} : {res[1]}/{res[2]}
              {/await}
            </td>

            <td>
              {#await getErrors(a.address)}
                ...
              {:then errs}
                {errs}
              {:catch error}
                <p style="color: red">{error.message}</p>
              {/await}
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</main>
