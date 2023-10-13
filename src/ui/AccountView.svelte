<script lang="ts">
  import Card from './Card.svelte'
  import AccountTable from './AccountTable.svelte'

  import { selectedAccount } from '../store'
  import type { UserAccount } from '../types'

  let profiles: UserAccount[] = []
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
