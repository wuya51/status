<script>
    import { valDataStore } from '../store';
</script>
<main>
  <h5> Validator Universe (elegible): </h5>
  <ul>
    {#each $valDataStore.eligible_validators as v}
      <li> {v.slice(0,5)} </li>
    {/each}
  </ul>
</main>