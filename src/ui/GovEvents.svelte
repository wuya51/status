<script lang="ts">
    import { postViewFunc } from "../api"
    import { govStore } from "../store"
    import Card from "./Card.svelte"

    let highest_proposal;
    let can_resolve;
    govStore.subscribe((all) => {
      if (all) {
        highest_proposal = all.map((e) => {
          return +e.data.proposal_id
        })
        .reduce((p, e) => {
          return Math.max(p, e)
        }, 0)

        postViewFunc({
          function: "0x1::diem_governance::get_can_resolve",
          arguments: [highest_proposal.toString()],
          type_arguments: []
        })
        .then(r => {
          can_resolve = r[0]
        })
      }


    })
</script>

<main>

  {#if $govStore}

  <Card title="Upgrade Votes" style="default">

    <div slot="body">
    <h4 class="uk-text-muted"> PASSING: {can_resolve} </h4>
    <table class="uk-table uk-table-responsive uk-table-divider">
      <thead>
        <tr>
          <th>Address</th>
          <th>Proposal</th>
          <th>For/Against</th>
        </tr>
      </thead>
      <tbody>
        {#if $govStore.length > 0}
          {#each $govStore as a}
            {#if a.data.proposal_id == highest_proposal}
            <tr>
              <td>{a.data.voter.slice(0, 5)}</td>
              <td>{a.data.proposal_id}</td>
              <td>{a.data.should_pass}</td>
            </tr>
            {/if}
          {/each}
        {/if}
      </tbody>
    </table>
    </div>
  </Card>

  {/if}


</main>
