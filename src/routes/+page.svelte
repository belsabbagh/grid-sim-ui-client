<script>
import JsonDisplayRow from "../lib/JsonDisplayRow.svelte";
import Meters from "../lib/Meters.svelte";

let meters = $state([]);
let status = $state("idle");
let time = $state("");
let gridState = $state({});

async function handleSubmit(event) {
	event.preventDefault();
	status = "started";
	const formData = new FormData(event.currentTarget);
	const data = Object.fromEntries(formData);
	data.numMeters = parseInt(data.numMeters, 10);

	try {
		const response = await fetch("/api/run", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		while (true) {
			const { value, done } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value, { stream: true });

			const messages = chunk.split("\n\n");
			console.debug(messages);

			for (const msg of messages) {
				if (!msg.startsWith("data: ")) {
					continue;
				}
				const jsonStr = msg.replace("data: ", "").trim();
				const data = JSON.parse(jsonStr);
				status = data.status;
				if (status === "done" || status === "started") {
					continue;
				}
				time = data.state.time;
				meters = data.state.meters;

				let formattedGrid = { ...data.state.grid_state };
				for (let key in formattedGrid) {
					formattedGrid[key] = parseFloat(formattedGrid[key].toFixed(2));
				}
				gridState = formattedGrid;
			}
		}
	} catch (error) {
		console.error(error);
	}
}
</script>
<main>
  <h1>Welcome to the home page</h1>

<br>
<h2>Start a new run</h2>
<form onsubmit={handleSubmit} method="POST">
  <label for="numMeters">Number of meters:</label>
  <input type="number" id="numMeters" name="numMeters" min="2" max="30" value="10" required>
  <label for="startDate">Start date:</label>
  <input type="datetime-local" id="startDate" name="startDate" value="2020-01-01T00:00" required>
  <div class="button-row">
    <button type="submit" disabled={status === "running"}>Start</button>
    <button type="reset">Reset</button>
  </div>
</form>
  {#if status ==="running" || status === "done"}
  <h1>Simulation</h1>
  <h2>{time}</h2>

    <div class="control-block">
      <JsonDisplayRow data={gridState} />

    </div>
  <div class="card">
    <Meters {meters} />
  </div>
{/if}
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
