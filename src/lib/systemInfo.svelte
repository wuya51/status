<script>
  import 'uikit/dist/css/uikit.min.css';
  import { systemInfo } from '../store';  
</script>

<section>
  <h2>System Information</h2>
  <div uk-grid class="uk-grid-small uk-child-width-1-2@s uk-child-width-1-2@m">
    {#if $systemInfo}
    <div>

        <p>Chain ID: {$systemInfo.chain_id}</p>
        <p>Epoch: {$systemInfo.epoch}</p>
        <p>Ledger Version: {$systemInfo.ledger_version}</p>
        <p>Oldest Ledger Version: {$systemInfo.oldest_ledger_version}</p>
        <p>Fees: {$systemInfo.fees}</p>
    </div>
    <div>
        <!-- Display part 2 of the system information -->
        <p>Ledger Timestamp: {$systemInfo.ledger_timestamp}</p>
        <p>Node Role: {$systemInfo.node_role}</p>
        <p>Oldest Block Height: {$systemInfo.oldest_block_height}</p>
        <p>Block Height: {$systemInfo.block_height}</p>
        <p>Git Hash: {$systemInfo.git_hash}</p>
        <p>Epoch Duration: {$systemInfo.epoch_duration}</p> 
    </div>
    {:else}
        <p>Loading...</p>
    {/if}
  </div>
</section>
