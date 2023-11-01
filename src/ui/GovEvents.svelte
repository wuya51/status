<script lang="ts">
    import { getEventList } from "../api"
    import { govEvents } from "../api/payloads/events"
    import Card from "./Card.svelte"


  let event = govEvents();
</script>

<main>
  {#await getEventList(event)}
  ...
  {:then list}


  <Card title="Upgrade Votes" style="default">

    <div slot="body">
    <table class="uk-table uk-table-responsive uk-table-divider">
      <thead>
        <tr>
          <th>Address</th>
          <th>Proposal</th>
          <th>For/Against</th>
        </tr>
      </thead>
      <tbody>
        {#if list.length > 0}
          {#each list as a}
            <tr>
              <td>{a.data.voter.slice(0, 5)}</td>
              <td>{a.data.proposal_id}</td>
              <td>{a.data.should_pass}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
    </div>
  </Card>

  {/await}


</main>
