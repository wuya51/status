<script>
  import Card from './Card.svelte'
  import ValidatorSet from './ValidatorSet.svelte'
  import ValidatorUniverse from './ValidatorUniverse.svelte'
</script>

<main>
  <Card title="Validators" style="primary">
    <div slot="body">
      <ValidatorUniverse />
      <ValidatorSet />
    </div>
  </Card>
</main>
