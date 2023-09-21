<script lang="ts">
    import type { UserAccount } from "../types"
    import { scaleCoin } from "../utils/coin"

    export let profiles: UserAccount[] = [];
</script>

<main>
  <!-- {JSON.stringify(profiles, null, 2)} -->

  <table class="uk-table uk-table-responsive uk-table-divider">
    <thead>
      <tr>
        <th>Address</th>
        <th>Count Vouchers</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      {#if profiles.length > 0}
        {#each profiles as a}
          <tr>
            <td>{a.address.slice(0, 5)}</td>
            <td>{a.active_vouchers && a.active_vouchers.length || "no buddies"}</td>
            <td>{a.balance && `${scaleCoin(a.balance.unlocked)} / ${scaleCoin(a.balance.total)}` || 'no balance found' }</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>

</main>