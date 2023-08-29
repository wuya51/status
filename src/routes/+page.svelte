<script>
  import 'uikit/dist/css/uikit.min.css'

  import { onMount } from 'svelte'
  import { refresh, makeUrl, indexStore, validatorList } from '../modules/api'
  import Card from '../ui/Card.svelte'

  let url = makeUrl()

  onMount(() => {
    refresh()

    setInterval(
      refresh,
      50000 // 5 secs
    )
  })
</script>

<main>
  <h1>status</h1>

  <p>
    api url: {url}
  </p>

  <div class="uk-flex">
    {#if $indexStore}
      <Card title="metadata">
        <div slot="body">
          <p>chain id: {$indexStore.chain_id}</p>
          <p>epoch: {$indexStore.epoch}</p>
          <p>timestamp: {$indexStore.ledger_timestamp}</p>
          <p>block height: {$indexStore.block_height}</p>
        </div>
      </Card>
    {/if}
    {#if $validatorList}
      <Card title="validators">
        <div slot="body">
          {#each $validatorList as v}
            <div>{v}</div>
          {/each}
        </div>
      </Card>
    {/if}
  </div>

  <!-- <div>
    <a href="{base}/about">Example Route</a>
  </div> -->
</main>
