<script>
  export let title
  export let style = "default"
</script>

<div class="uk-card uk-card-{style} uk-card-body uk-margin-left uk-margin-bottom">
  <h5 class="uk-card-title">{title}</h5>
  <slot name="body"/>
</div>
