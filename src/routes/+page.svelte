<script>
  import 'uikit/dist/css/uikit.min.css'

  import { onMount } from 'svelte'
  import { initApi } from '../api'
  import { refresh } from '../store'
  import SystemInfo from '../ui/SystemInfo.svelte'
  import Validators from '../ui/Validators.svelte'

  let url
  let note

  onMount(async () => {
    const apiConfig = await initApi()
    url = apiConfig.apiUrl
    note = apiConfig.note

    refresh()

    setInterval(
      refresh,
      50000 // 50 secs
    )
  })
</script>

<main class="uk-container">
  <h1>status</h1>

  <p>
    api url: {url}
    note: {note}
  </p>

  <div class="container">
    <div class="uk-flex uk-flex-wrap">
      <SystemInfo />
      <Validators />
    </div>
  </div>
</main>
