<script>
  import 'uikit/dist/css/uikit.min.css'

  import { onMount } from 'svelte'
  import { initApi } from '../api'
  import { refresh, selectedAccount } from '../store'
  import SystemInfo from '../ui/SystemInfo.svelte'
  import Validators from '../ui/Validators.svelte'
    import AccountView from '../ui/AccountView.svelte'
    import PoFView from '../ui/PoFView.svelte'

  let url
  let note

  onMount(async () => {
    const apiConfig = await initApi()
    url = apiConfig.apiUrl
    note = apiConfig.note

    refresh()

    setInterval(
      refresh,
      5000 // 5 secs
    )
  })
</script>

<main class="uk-container">
  <h1>status</h1>

  <p>
    api url: <a href="{url}spec" target="_blank">{url} </a>
    note: {note}
    account: {$selectedAccount.address}
  </p>

  <div class="container">
    <div class="uk-flex uk-flex-wrap">
      <SystemInfo />
      <Validators />
      <AccountView />
      <PoFView />
    </div>
  </div>
</main>
