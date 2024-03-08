<script>
  export let data;
</script>

<main>
  <h1>Playback</h1>
  <ul>
    {#each data.runs as run}
      <li>
        <a href={`/runs/${run}`}>{run}</a>
      </li>
    {/each}
  </ul>
</main>
