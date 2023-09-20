<script>
  import { valDataStore } from '../store'
</script>

<main>

  <table class="uk-table uk-table-responsive uk-table-divider">
    <thead>
      <tr>
        <th>Address</th>
        <th>Count Vouchers</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      {#if $valDataStore && $valDataStore.validators && $valDataStore.validators.length > 0}
        {#each $valDataStore.validators as v}
          <tr>
            <td>{v.address.slice(0, 5)}</td>
            <td>{v.activeVouchers && v.activeVouchers.length || 666}</td>
            <td>{v.balance && v.balance.total || 666 }</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>

  <!--
    <ul>
      {#each $validatorUniverse.validators as validator}
        <li>
          <h3>{validator.address}</h3>
          {#if validator.activeVouchers}
            <p>Active Vouchers: {validator.activeVouchers.join(", ")}</p>
          {:else}
            <p>Active Vouchers: None</p>
          {/if}
          {#if validator.inactiveVouchers}
            <p>Inactive Vouchers: {validator.inactiveVouchers.join(", ")}</p>
          {:else}
            <p>Inactive Vouchers: None</p>
          {/if}
          <p>Balance: {validator.balance}</p>
        </li>
      {/each}
    </ul> -->
</main>
