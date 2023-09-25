<script>
  import 'uikit/dist/css/uikit.min.css'
  import { systemInfo } from '../store'

  import Card from './Card.svelte'
</script>

<Card title="Boundary Status" style="default">
  <div slot="body">
    {#if $systemInfo && $systemInfo.boundary_status}
      <ul>
        {#each Object.keys($systemInfo.boundary_status) as k }
        <li>{k}: {$systemInfo.boundary_status[k]}</li>
        {/each}
      </ul>
    {:else}
      <span>Loading...</span>
    {/if}
  </div>
</Card>
