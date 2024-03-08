<script>
    import JsonDisplayRow from "../../lib/JsonDisplayRow.svelte";
    let clear;
    let meters = [];
    let time = "";
    let remaining = 0; // State for remaining attribute
    let gridState = {}; // State for JSON data
    let ms = 1000; // Fetch interval in ms
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/next", {
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
      <div
        style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 10px; justify-content: center;"
      >
        {#each meters as meter, index}
          <div
            id={index.toString()}
            style="min-width: 200px; border-width: 1px; border-style: solid; border-color: {meter.surplus >=
            0
              ? '#00FF00'
              : '#FF0000'}; padding: 8px; border-radius: 20px;"
          >
            <h3>Meter {meter.id}</h3>
            <p>Surplus: {parseFloat(meter.surplus.toFixed(5))}</p>
            <p style="min-width: 100px;">In Trade: {meter.in_trade}</p>
          </div>
        {/each}
      </div>
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
  