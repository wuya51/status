<script lang="ts">
  import { valDataStore } from '../store'
  import AccountTable from './AccountTable.svelte'

</script>

<main>
  {#if $valDataStore && $valDataStore.current_profiles }
  <h5>Validator Set ({$valDataStore && $valDataStore.current_profiles && $valDataStore.current_profiles.length || 0}):</h5>
  <AccountTable profiles={$valDataStore.current_profiles} />

  {/if}
</main>
