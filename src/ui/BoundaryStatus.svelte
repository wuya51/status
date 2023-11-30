<script>
  import 'uikit/dist/css/uikit.min.css'
  import { systemInfo } from '../store'

  import Card from './Card.svelte'
</script>

<Card title="Boundary Status" style="default">
  <div slot="body">
    <!-- {JSON.stringify($systemInfo)} -->
    {#if $systemInfo && $systemInfo.boundary_status}

      Musical Chairs:
      <li>
        incoming_compliant:
        {#each $systemInfo.boundary_status['incoming_compliant'] as e}
          {e.slice(0, 5)} |{'\t'}
        {/each}
      </li>
      <li>incoming_compliant_count: {$systemInfo.boundary_status['incoming_compliant_count']}</li>
      <li>incoming_seats_offered: {$systemInfo.boundary_status['incoming_seats_offered']}</li>


      Proof-of-Fee:
      <li>
        incoming_all_bidders:
        {#each $systemInfo.boundary_status['incoming_all_bidders'] as e}
          {e.slice(0, 5)} |{'\t'}
        {/each}
      </li>

      <li>
        incoming_only_qualified_bidders:
        {#each $systemInfo.boundary_status['incoming_only_qualified_bidders'] as e}
          {e.slice(0, 5)} |{'\t'}
        {/each}
      </li>

      <li>
        incoming_auction_winners:
        {#each $systemInfo.boundary_status['incoming_auction_winners'] as e}
          {e.slice(0, 5)} |{'\t'}
        {/each}
      </li>

      <li>incoming_filled_seats: {$systemInfo.boundary_status['incoming_filled_seats']}</li>

      <li>incoming_fees: {$systemInfo.boundary_status['incoming_fees']}</li>
      <li>incoming_fees_success: {$systemInfo.boundary_status['incoming_fees_success']}</li>

      Reconfiguration:
      <li>
        incoming_post_failover_check:
        {#each $systemInfo.boundary_status['incoming_post_failover_check'] as e}
          {e.slice(0, 5)} |{'\t'}
        {/each}
      </li>
      <li>
        incoming_missing_configs
        {#each $systemInfo.boundary_status['incoming_vals_missing_configs'] as e}
          {e.slice(0, 5)} |{'\t'}
        {/each}
      </li>

      <li>
        incoming_actual_vals:
        {#each $systemInfo.boundary_status['incoming_actual_vals'] as e}
          {e.slice(0, 5)} |{'\t'}
        {/each}
      </li>
      <li>incoming_final_set_size: {$systemInfo.boundary_status['incoming_final_set_size']}</li>
      <li>incoming_reconfig_success: {$systemInfo.boundary_status['incoming_reconfig_success']}</li>
    {/if}
  </div>
</Card>
