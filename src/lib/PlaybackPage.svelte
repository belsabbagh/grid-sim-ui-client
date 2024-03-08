<script>
  import { onMount } from "svelte";
  import PlaybackBar from "./PlaybackBar.svelte";
  import { writable } from "svelte/store";
  import Meters from "./Meters.svelte";

  let parameters = { startDate: null, endDate: null };

  let state = writable({
    meters: [],
  });

  function fetchState(n) {
    fetch("http://127.0.0.1:5000/states/" + n, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          state.set(data.state);
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
  }


  onMount(() => {
    fetch("http://127.0.0.1:5000/parameters", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        parameters.startDate = new Date(data.parameters.START_DATE);
        parameters.endDate = new Date(data.parameters.END_DATE);
      })
      .catch((error) => {
        console.error("Error fetching parameters:", error);
      });

    fetchState(0);
  });

</script>

<PlaybackBar {parameters} onchange={fetchState} />
<Meters meters={$state.meters} />
