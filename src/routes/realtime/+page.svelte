<script>
    import JsonDisplayRow from "../../lib/JsonDisplayRow.svelte";
    import Meters from "../../lib/Meters.svelte";
    let clear;
    let meters = [];
    let time = "";
    let remaining = 0; // State for remaining attribute
    let gridState = {}; // State for JSON data
    let ms = 1000; // Fetch interval in ms
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/realtime/next", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        if (!response.ok) return;
        const data = await response.json();
        if (data === null) return;
        let grid_state = data.grid_state;
        for (let key in grid_state) {
          grid_state[key] = parseFloat(grid_state[key].toFixed(5));
        }
        time = data.time;
        meters = data.meters;
        remaining = data.remaining;
        gridState = data.grid_state;
      } catch (error) {
        console.error(error);
      }
    };
  
    $: {
      clearInterval(clear);
      clear = setInterval(fetchData, ms);
    }
  </script>
  
  <main>
    <h1>Grid Simulator</h1>
    <h2>{time}</h2>
    <div class="controls">
      <div class="control-block">
        <JsonDisplayRow data={gridState} />
      </div>
      <div class="control-block frame-control">
        <div class="slider-container">
          <label for="intervalSlider">Interval:</label>
          <input
            type="range"
            id="intervalSlider"
            min="100"
            max="3000"
            step="100"
            bind:value={ms}
          />
          <span>{ms} ms</span>
        </div>
        <div class="remaining">
          <span>Remaining: {remaining}</span>
        </div>
      </div>
  
    </div>
  
    <div class="card">
        <Meters {meters} />
    </div>
  </main>
  
  <style>
    .slider-container {
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;
    }
  
    .control-block {
      border: 1px solid #ba6be5;
      padding: 10px;
      border-radius: 10px;
    }
  
    .controls {
      display: flex;
      flex-direction: row;
      gap: 10px;
      justify-content: space-around;
      align-items: center;
      padding: 10px;
    }
  
    .frame-control {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  </style>
  