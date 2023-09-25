<script lang="ts">
  import Card from './Card.svelte'
  import AccountTable from './AccountTable.svelte'

  import { fetchUserAccounts, selectedAccount } from '../store'
  import { onMount } from 'svelte'
  import type { UserAccount } from '../types'

  let profiles: UserAccount[] = []
  onMount(async () => {
    // selectedAccount.subscribe((a) => {
    //   console.log(a)
    //   if (a) fetchUserAccounts([a.address])
    //     .then(p => profiles = p)
    // });
  })
</script>

<main>
  {#if $selectedAccount && profiles.length > 0 }
  <Card title="User: {$selectedAccount.address.slice(0,5)}" style="primary">
    <div slot="body">
      <AccountTable {profiles} />
    </div>
  </Card>
  {/if}
</main>
