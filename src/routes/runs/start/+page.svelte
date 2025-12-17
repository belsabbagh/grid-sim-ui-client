<script>
  

  
  /**
   * @typedef {Object} Props
   * @property {import('./$types').PageData} data
   * @property {import('./$types').ActionData} form
   */

  /** @type {Props} */
  let { data, form } = $props();
</script>

<main>
  <h1>Starting a new run</h1>
  {#if form.status === "failed"}
    <p>{form.message}</p>
    
  {:else if form?.status === "success"}
    <p>Successfully started. Go see the run <a href="/realtime">here</a></p>
  {/if}
</main>
