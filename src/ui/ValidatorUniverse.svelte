<script>
  import { setAccount, valDataStore } from '../store'
</script>

<main>
  <!-- {#if $valDataStore && valDataStore.eligible_validators} -->
    <h5>Validator Universe ({$valDataStore.eligible_validators.length || 0} elegible):</h5>
    <ul>
      {#each $valDataStore.eligible_validators as v}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li on:click={setAccount(v)}>{v.slice(0, 5)}</li>
      {/each}
    </ul>
</main>
