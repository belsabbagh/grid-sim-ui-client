<script>
  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<main>
  <h1>Starting a new run</h1>
  {#if form.status === "failed"}
    <p>{form.message}</p>
    
  {:else if form?.status === "success"}
    <p>Successfully started. Go see the run <a href="/realtime">here</a></p>
  {/if}
</main>
