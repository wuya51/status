<script>
  import 'uikit/dist/css/uikit.min.css'
  
  import { base } from '$app/paths'
  import { onMount } from 'svelte'
  import { makeUrl } from '../constants'
  import { refresh } from '../store'
  import SystemInfo from '$lib/SystemInfo.svelte';  
  import Validators from '$lib/Validators.svelte';  

  let url = makeUrl()

  onMount(() => {
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
  </p>

  <div class="container">
    <div uk-grid>
      <div>
        <div class="uk-card uk-card-default uk-card-body">
          <SystemInfo />  
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-primary uk-card-body">
          <Validators />  
        </div>
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