<script lang="ts">
  import Card from './Card.svelte'
  import AccountTable from './AccountTable.svelte'

  import { fetchUserAccounts, selectedAccount } from '../store'
  import { onMount } from 'svelte'
  import type { UserAccount } from '../types'

  let profiles: UserAccount[] = []
  onMount(async () => {
    selectedAccount.subscribe((a) => {
      fetchUserAccounts([a]).then(p => profiles = p)
    });
  })
</script>

<main>
  {#if $selectedAccount}
  <Card title="User: {$selectedAccount.slice(0,5)}" style="primary">
    <div slot="body">
      <AccountTable {profiles} />
    </div>
  </Card>
  {/if}
</main>
