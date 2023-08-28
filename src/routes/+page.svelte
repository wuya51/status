<script>
  import 'uikit/dist/css/uikit.min.css'

  import { base } from '$app/paths'
  import { onMount } from 'svelte'
  import { refresh, makeUrl, indexStore, validatorList } from './api'

  let url = makeUrl()

  onMount(() => {
    refresh()

    setInterval(
      refresh,
      50000 // 5 secs
    )
  })
</script>

<main class="uk-container">
  <h1>status</h1>

  <p>
    api url: {url}
  </p>

<div class="container">
    <div class="uk-flex-center" uk-grid>
    <div>
      <div class="uk-card uk-card-default uk-card-body">
        <h5 class="uk-card-title">metadata</h5>
        {#if $indexStore}
          <p>chain id: {$indexStore.chain_id}</p>
          <p>epoch: {$indexStore.epoch}</p>
          <p>timestamp: {$indexStore.ledger_timestamp}</p>
          <p>block height: {$indexStore.block_height}</p>
        {/if}
      </div>
    </div>

      <div>
        {#if $validatorList}
        <div class="uk-card uk-card-primary uk-card-body">
          <h3 class="uk-card-title">Validators</h3>
          <div>
            {#each $validatorList as v}
              <div>{v}</div>
            {/each}
          </div>
        </div>
            {/if}
      </div>
    <div>
      <div class="uk-card uk-card-default uk-card-body">
        <h3 class="uk-card-title">Secondary</h3>
        <span> add more views here</span>
      </div>
    </div>
  </div>

</div>


  <div>
    <a href="{base}/about">Example Route</a>
  </div>
</main>
