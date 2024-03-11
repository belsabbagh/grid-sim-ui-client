<script>
  export let data;
</script>

<main>
  <h1>Playback</h1>
  <div class="tiles-container">
    {#each data.runs as run}
      <div class="tile">
        <a href={`/runs/${run.id}`} class="tile-link">
          <div class="tile-content">
            <div class="tile-id">{run.id}</div>
            <ul class="tile-parameters">
              <li>{run.parameters.NUM_METERS} meters</li>
              <li>Start: {run.parameters.START_DATE}</li>
              <li>End: {run.parameters.END_DATE}</li>
            </ul>
            <div class="tile-created">Created: {run.created}</div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</main>

<style>
  .tiles-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .tile {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
    border: 1px solid var(--accent-color);
    width: 330px; /* Adjust width as needed */
  }

  .tile-link {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  .tile-content {
    padding: 20px;
  }

  .tile-id {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
    font-family: "Courier New", monospace;
    max-width: 330px;
  }

  .tile-parameters {
    list-style: none;
    margin-left: 0;
    padding-left: 0%;
    margin-bottom: 8px;
  }

  .tile-created {
    font-size: 14px;
  }

  .tile:hover {
    transform: translateY(-5px);
  }
</style>
