<script>
  import 'uikit/dist/css/uikit.min.css'

  import { onMount } from 'svelte'
  import { initApi, setApi } from '../api'
  import { refresh, selectedAccount, apiUrl, apiUrlNote } from '../store'
  import SystemInfo from '../ui/SystemInfo.svelte'
  import Validators from '../ui/Validators.svelte'
  import AccountView from '../ui/AccountView.svelte'
  import BoundaryStatus from '../ui/BoundaryStatus.svelte'
  import ValidatorUniverse from '../ui/ValidatorUniverse.svelte'
    import GovEvents from '../ui/GovEvents.svelte'

  onMount(async () => {
    await initApi() // ONLY DO THIS ONCE ON LOAD

    refresh()

    setInterval(
      refresh,
      5000 // 5 secs
    )
  })
</script>

<main class="uk-container uk-text-small">
  <h1>status</h1>

  <div class="uk-grid uk-row">
    <div class="uk-column-1-3">
      <button class="uk-button uk-button-default" on:click={refresh}>refresh</button>
    </div>

    <!-- api url: <a href="{$apiUrl}spec" target="_blank">{$apiUrl} </a> -->
    <div class="uk-margin uk-column-1-3">
      {#if $apiUrl}
        <input
          class="uk-input"
          type="text"
          placeholder={$apiUrl}
          aria-label="Input"
          bind:value={$apiUrl}
        />
        <button class="uk-button uk-button-default" on:click={setApi($apiUrl)}>update url</button>
        note: {$apiUrlNote}
      {/if}
    </div>
  </div>

  <div>
    <div class="uk-flex uk-flex-wrap">
      {#if $selectedAccount && $selectedAccount.address}
        <AccountView />
      {:else}
        <SystemInfo />
        <BoundaryStatus />
        <Validators />
        <!-- <ValidatorUniverse /> -->
        <!-- <GovEvents/> -->
      {/if}
    </div>
  </div>
</main>
