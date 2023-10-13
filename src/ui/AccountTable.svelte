<script lang="ts">
  import { postViewFunc } from '../api'
  import { validator_grade_payload } from '../api/payloads/validators'
    import { setAccount } from '../store'
  import type { UserAccount } from '../types'
  import { scaleCoin } from '../utils/coin'

  export let profiles: UserAccount[] = []
</script>

<main>
  <!-- {JSON.stringify(profiles, null, 2)} -->

  <table class="uk-table uk-table-responsive uk-table-divider">
    <thead>
      <tr>
        <th>Address</th>
        <th>All Vouchers</th>
        <th>Active Vouchers</th>
        <th>Balance</th>
        <th>Grade</th>
      </tr>
    </thead>
    <tbody>
      {#if profiles.length > 0}
        {#each profiles as a}
          <tr>
            <td> <button on:click={() => setAccount(a.address)} class="uk-button
            uk-button-link"> {a.address.slice(0, 5)}
            </button></td>
            <td>{(a.all_vouchers && a.all_vouchers.length) || 'no buddies'}</td>

            <td>{(a.active_vouchers && a.active_vouchers.length) || 'no buddies'}</td>
            <td
              >{(a.balance && `${scaleCoin(a.balance.unlocked)} / ${scaleCoin(a.balance.total)}`) ||
                'no balance found'}</td
            >
            <td>
              {#await postViewFunc(validator_grade_payload(a.address))}
                ...
              {:then res}
                {res[0]} : {res[1]}/{res[2]}
              {/await}
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</main>
