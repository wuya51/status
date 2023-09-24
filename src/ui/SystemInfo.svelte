<script>
  import 'uikit/dist/css/uikit.min.css'
  import { systemInfo } from '../store'
  import { scaleCoin } from "../utils/coin"

  import Card from './Card.svelte'
</script>

<Card title="System Information" style="default">
  <div slot="body">
    {#if $systemInfo}
      <ul>
        <li>Chain ID: {$systemInfo.chain_id}</li>
        <li>Epoch: {$systemInfo.epoch}</li>
        <li>Ledger Version: {$systemInfo.ledger_version}</li>
        <li>Oldest Ledger Version: {$systemInfo.oldest_ledger_version}</li>
        <li>Fees: {$systemInfo.fees}</li>
      </ul>
      <ul>
        <!-- Display part 2 of the system information -->
        <li>Ledger Timestamp: {$systemInfo.ledger_timestamp}</li>
        <li>Node Role: {$systemInfo.node_role}</li>
        <li>Oldest Block Height: {$systemInfo.oldest_block_height}</li>
        <li>Block Height: {$systemInfo.block_height}</li>
        <li>Git Hash: {$systemInfo.git_hash}</li>
        <li>Epoch Duration: {$systemInfo.epoch_duration}</li>
      </ul>
      <ul>
        <li>VDF Difficulty: {$systemInfo.vdf[0]}</li>
        <li>VDF Security: {$systemInfo.vdf[1]}</li>
        <li>Infra Escrow: {scaleCoin($systemInfo.infra_escrow)}</li>

      </ul>

      <ul>
        <li>Val Seats: {$systemInfo.validator_seats}</li>
      </ul>

      <ul>
        <li>boundary status: {JSON.stringify($systemInfo.boundary_status, false, 4)}</li>
      </ul>
    {:else}
      <span>Loading...</span>
    {/if}
  </div>
</Card>
