<script>
  import { validatorUniverse } from '../store';
</script>

<section>
  <h2>Validators</h2>
  {#if $validatorUniverse.validators.length > 0}
    <ul>
      {#each $validatorUniverse.validators as validator}
        <li>
          <h3>{validator.address}</h3>
          {#if validator.activeVouchers !== undefined}
            <p>Active Vouchers: {validator.activeVouchers.join(", ")}</p>
          {:else}
            <p>Active Vouchers: None</p>
          {/if}
          {#if validator.inactiveVouchers !== undefined}
            <p>Inactive Vouchers: {validator.inactiveVouchers.join(", ")}</p>
          {:else}
            <p>Inactive Vouchers: None</p>
          {/if}
          <p>Balance: {validator.balance}</p>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Loading...</p>
  {/if}
</section>
