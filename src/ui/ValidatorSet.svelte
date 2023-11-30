<script lang="ts">
  import { fetchUserAccounts, valDataStore } from '../store'
  import type { UserAccount } from '../types'
  import AccountTable from './AccountTable.svelte'

  let profiles: UserAccount[]
  valDataStore.subscribe((valState) => {
    if (valState) {
      fetchUserAccounts(valState.eligible_validators).then((r) =>
      {
        r.map((el) => {
          el.in_val_set = valState.current_list.includes(el.address);
        })
        r.sort(sortVals)
        profiles = r
      })
    }
  })

  function sortVals(a: UserAccount, b: UserAccount) {
    if (a.in_val_set) return -1 // sort to top
    else return 1
  }
</script>

<main>
  {#if $valDataStore && $valDataStore.current_list}
    <h5>
      Validator Set ({($valDataStore &&
        $valDataStore.current_list &&
        $valDataStore.current_list.length) ||
        0}):
    </h5>
  {/if}
  {#if profiles && profiles.length > 0}
    <AccountTable {profiles} />
  {:else}
    loading ...
  {/if}
</main>
