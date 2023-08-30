<script >
  import { validatorUniverse } from '../store';
  import Card from './Card.svelte'
</script>

<Card title="Validators" style="primary">
  <div slot="body">
  {#if $validatorUniverse.validators.length > 0}
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
    </ul>
  {:else}
    <p>Loading...</p>
  {/if}
  </Card>