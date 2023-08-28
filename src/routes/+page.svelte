<script>
  import { base } from "$app/paths"
    import { onMount } from "svelte"
  // import { onMount } from "svelte"
  import {getIndex, makeUrl} from "./api"

  let url = "none"
  let index;
  // onMount
  onMount(() => {
    // window.alert("hi")
    // status = api.getIndex()
    url = makeUrl()
    getIndex()
    .then((r) => {
      index = r
    })

    // api.get("")
    // .then((r) => {
    //   window.alert(r)
    //   index = r
    // })

  })
</script>

<h1>status</h1>

<p>
  URL: {url}



</p>

<p>
  Index: {JSON.stringify(index)}
</p>
<a href="{base}/about">About</a>
