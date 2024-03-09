<script>
  import PlaybackBar from "../../../lib/PlaybackBar.svelte";
  import Meters from "../../../lib/Meters.svelte";
  import { writable } from "svelte/store";
  import JsonDisplayRow from "../../../lib/JsonDisplayRow.svelte";
  export let data;
  let state = writable(data.firstState);
  async function fetchState(n) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/runs/${data.runId}/states/${n}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch states');
    }
    
    const responseData = await response.json();
    state.set(responseData);
  } catch (error) {
    console.error("Error fetching states:", error);
  }
}

</script>

<main>
  <h1>Playing back {data.runId}</h1>
  <PlaybackBar
    parameters={{
      startDate: new Date(data.parameters.START_DATE),
      endDate: new Date(data.parameters.END_DATE),
    }}
    onchange={fetchState}
  />
  <JsonDisplayRow data={$state.grid_state} />
  <Meters meters={$state.meters} />
</main>
