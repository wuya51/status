<script>
  import { valDataStore } from '../store'
</script>

<main>
  <!-- {#if $valDataStore && valDataStore.eligible_validators} -->
    <h5>Validator Universe ({$valDataStore.eligible_validators.length || 0} elegible):</h5>
    <ul>
      {#each $valDataStore.eligible_validators as v}
        <li>{v.slice(0, 5)}</li>
      {/each}
    </ul>
</main>
