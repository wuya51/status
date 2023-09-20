<script>
  import { valDataStore } from '../store'
</script>

<main>
  {JSON.stringify($valDataStore.current_profiles, null, 2)}
  <table class="uk-table uk-table-responsive uk-table-divider">
    <thead>
      <tr>
        <th>Address</th>
        <th>Count Vouchers</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      {#if $valDataStore && $valDataStore.current_profiles && $valDataStore.current_profiles.length > 0}
        {#each $valDataStore.current_profiles as v}
          <tr>
            <td>{v.address.slice(0, 5)}</td>
            <td>{v.active_vouchers && v.active_vouchers.length || "no buddies"}</td>
            <td>{v.balance && v.balance.total || 'no balance found' }</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</main>
