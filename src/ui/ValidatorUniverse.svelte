<script lang="ts">
  import Card from './Card.svelte'
  import { pofInfo, setAccount } from '../store'
  import { postViewFunc } from '../api'
  import { getPoFErrors } from '../api/payloads/system'
  import { mapPoFErrors } from '../types/proof_of_fee'

  const getErrors = async (addr: string): Promise<string[]> => {
    return postViewFunc(getPoFErrors(addr)).then((res) => {
      return mapPoFErrors(res[0])
    })
  }
</script>

<main>
  <Card title="Validator Universe" style="default">
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
                <td
                  ><button
                    on:click={() => setAccount(addr)}
                    class="uk-button uk-button-link"
                    >{addr.slice(0, 5)}
                  </button></td
                >
                <td>{$pofInfo.bids[idx]}</td>
                <td>{$pofInfo.qualified.includes(addr)}</td>

                <td>
                  {#await getErrors(addr)}
                    ...
                  {:then errs}
                    {errs}
                  {:catch error}
                    <p style="color: red">{error.message}</p>
                  {/await}
                </td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </Card>
</main>
