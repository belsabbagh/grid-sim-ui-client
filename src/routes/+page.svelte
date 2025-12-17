<script>
import JsonDisplayRow from "../lib/JsonDisplayRow.svelte";
import Meters from "../lib/Meters.svelte";

let meters = $state([]);
let time = $state("");
let remaining = $state(0);
let gridState = $state({});
async function handleSubmit(event) {
	event.preventDefault(); // Stop page refresh

	// Extract form data to send to API
	const formData = new FormData(event.currentTarget);
	const data = {};
	formData.forEach((value, key) => {
		data[key] = value;
	});

	try {
		const response = await fetch("/api/run", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		if (!response.ok) return;

		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		while (true) {
			const { value, done } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value, { stream: true });
			const lines = chunk.split("\n").filter((line) => line.trim());

			for (const line of lines) {
				try {
					const data = JSON.parse(line);

					time = data.time;
					meters = data.meters;
					remaining = data.remaining;

					let formattedGrid = { ...data.grid_state };
					for (let key in formattedGrid) {
						formattedGrid[key] = parseFloat(formattedGrid[key].toFixed(5));
					}
					gridState = formattedGrid;
				} catch (e) {
					console.error("Error parsing stream chunk", e);
				}
			}
		}
	} catch (error) {
		console.error("Connection lost:", error);
	}
}
</script>
<main>
  <h1>Welcome to the home page</h1>

<br>
<h2>Start a new run</h2>
<form action="/api/run" method="POST">
  <label for="numMeters">Number of meters:</label>
  <input type="number" id="numMeters" name="numMeters" min="2" max="30" value="10" required>
  <label for="startDate">Start date:</label>
  <input type="datetime-local" id="startDate" name="startDate" value="2020-01-01T00:00" required>
  <div class="button-row">
    <button type="submit">Start</button>
    <button type="reset">Reset</button>
  </div>
</form>
  <h1>Simulation</h1>
  <h2>{time}</h2>
  <div class="controls">
    <div class="control-block">
      <JsonDisplayRow data={gridState} />
    </div>
  <!--   <div class="control-block frame-control"> -->
  <!--     <div class="slider-container"> -->
  <!--       <label for="intervalSlider">Interval:</label> -->
  <!--       <input -->
  <!--         type="range" -->
  <!--         id="intervalSlider" -->
  <!--         min="20" -->
  <!--         max="3000" -->
  <!--         step="20" -->
  <!--         bind:value={ms} -->
  <!--       /> -->
  <!--       <span>{ms} ms</span> -->
  <!--     </div> -->
  <!--     <div class="remaining"> -->
  <!--       <span>Remaining: {remaining}</span> -->
  <!--     </div> -->
  <!--   </div> -->
  <!-- </div> -->
  <!---->
  <div class="card">
    <Meters {meters} />
  </div>

</main>


<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .button-row {
    display: flex;
    gap: 10px;
  }

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
