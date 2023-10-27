<script>
  import { setAccount, valDataStore } from '../store'
</script>

<main>
  {#if $valDataStore && $valDataStore.eligible_validators}
  <!-- {#if $valDataStore && valDataStore.eligible_validators} -->
    <h5>Validator Universe ({$valDataStore.eligible_validators.length || 0} elegible):</h5>
    <ul>
      {#each $valDataStore.eligible_validators as v}
        <li><button on:click={setAccount(v)} class="uk-button uk-button-link">{v.slice(0, 5)}</button></li>
      {/each}
    </ul>
    {/if}
</main>
