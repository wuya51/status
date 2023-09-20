<script>
  import { onMount } from 'svelte'
  import { valDataStore } from '../store'
  import Card from './Card.svelte'
  import ValidatorTable from './ValidatorTable.svelte'
  import ValidatorUniverse from './ValidatorUniverse.svelte'

  onMount(() => {})
</script>

<main>
  <Card title="Validators" style="primary">
    <div slot="body">
      <ValidatorUniverse />
      <ValidatorTable />
    </div>
  </Card>
</main>
