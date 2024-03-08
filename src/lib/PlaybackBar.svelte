<script>
  import { onMount } from "svelte";

  export let selectedValue = 0;
  export let parameters = {
    startDate: null,
    endDate: null,
  };
  export let onchange;

  function formatDateTime(date) {
    const options = {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZoneName: 'short'
    };
    return date.toLocaleString(undefined, options);
  }

  function handleInput(event) {
    selectedValue = parseInt(event.target.value);
    if (onchange) {
      onchange(selectedValue);
    }
  }

  onMount(() => {
    if (parameters.startDate !== null && parameters.endDate !== null) {
      const maxMinutes = (parameters.endDate - parameters.startDate) / (60 * 1000);
      // Exclude end date
      selectedValue = Math.max(0, Math.min(selectedValue, maxMinutes - 1));
    }
  });
</script>

<div class="card-container">
  {#if parameters.startDate !== null && parameters.endDate !== null}
    <input
      type="range"
      min="0"
      max={(parameters.endDate - parameters.startDate) / (60 * 1000) - 1}
      bind:value={selectedValue}
      on:input={handleInput}
    />
    <p>
      {formatDateTime(new Date(parameters.startDate.getTime() + selectedValue * 60 * 1000))}
    </p>
  {:else}
    <p>Loading...</p>
  {/if}
</div>

<style>
  .card-container {
    width: 100%;
  }
  input[type="range"] {
    width: 100%;
  }
  p {
    text-align: center;
  }
</style>
