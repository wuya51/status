<script lang="ts">
  import { valDataStore } from '../store'
  import AccountTable from './AccountTable.svelte'

</script>

<main>
  <h5>Validator Set ({$valDataStore && $valDataStore.current_profiles && $valDataStore.current_profiles.length || 0}):</h5>
  <AccountTable profiles={$valDataStore.current_profiles} />

</main>
