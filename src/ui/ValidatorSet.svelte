<script lang="ts">
    import { loadConfigFromFile } from 'vite'
  import { fetchUserAccounts, valDataStore } from '../store'
    import type { UserAccount } from '../types'
  import AccountTable from './AccountTable.svelte'

  let profiles: UserAccount[];
  valDataStore.subscribe((e) => {
    if (e) {
      fetchUserAccounts(e.eligible_validators)
      .then((r) => {
        console.log("profiles", r)
        profiles = r
      })

    }
  })
</script>

<main>
  {#if $valDataStore && $valDataStore.current_list }
    <h5>Validator Set ({
      $valDataStore &&
      $valDataStore.current_list &&
      $valDataStore.current_list.length || 0
      }):
    </h5>
  {/if}
  {#if profiles && profiles.length > 0 }
    <AccountTable profiles={profiles} />
  {:else}
    loading ...
  {/if}
</main>
