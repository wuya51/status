<script>
  import Card from './Card.svelte'
  import { pofInfo } from '../store'
    import { getView } from '../api'
    import { getPoFErrors } from '../api/payloads/system'

</script>

<main>
  <Card title="Proof of Fee" style="default">
    <div slot="body">
      <!-- {JSON.stringify($pofInfo)} -->

      <table class="uk-table uk-table-responsive uk-table-divider">
        <thead>
          <tr>
            <th>Address</th>
            <th>Bid</th>
            <th>Qualified</th>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody>
          {#if $pofInfo && $pofInfo.bidders.length > 0}
            {#each $pofInfo.bidders as addr, idx}
              <tr>
                <td>{addr.slice(0, 5)}</td>
                <td>{$pofInfo.bids[idx]}</td>
                <td>{$pofInfo.qualified.includes(addr)}</td>
                <td>{getView(getPoFErrors(addr))}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </Card>
</main>
