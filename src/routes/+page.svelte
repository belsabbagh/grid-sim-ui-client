<script>
import JsonDisplayRow from "../lib/JsonDisplayRow.svelte";
import Meters from "../lib/Meters.svelte";

let meters = $state([]);
let status = $state("idle");
let time = $state("");
let gridState = $state({});
let analytics = $state({});
let tradeView = $state(true);

function surplusAfterTrade(meters) {
	const sortedMeters = meters
		.map((i) => ({ ...i, s: (i.s + i.p).toFixed(2) }))
		.sort((a, b) => a.id - b.id);
	return sortedMeters;
}
async function decompress(base64Data) {
	const binaryString = atob(base64Data);
	const bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
	const stream = new Response(bytes).body.pipeThrough(
		new DecompressionStream("gzip"),
	);
	const decompressedText = await new Response(stream).text();
	const originalData = JSON.parse(decompressedText);
	return originalData;
}
async function handleSubmit(event) {
	event.preventDefault();
	status = "started";
	const formData = new FormData(event.currentTarget);
	const data = Object.fromEntries(formData);
	data.numMeters = parseInt(data.numMeters, 10);
	const endpoint = import.meta.env.VITE_API_URL;
	try {
		const response = await fetch(`${endpoint}/run`, {
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

			for (const msg of messages) {
				if (!msg.startsWith("data: ")) {
					continue;
				}
				const jsonStr = msg.replace("data: ", "").trim();
				let data = null;
				try {
					data = JSON.parse(jsonStr);
				} catch (error) {
					console.error(error, jsonStr);
					continue;
				}
				status = data.status;
				if (status === "done" || status === "started") {
					continue;
				}
				time = data.state.time;
				const uncompressedMeters = await decompress(data.state.meters);
				meters = tradeView
					? surplusAfterTrade(uncompressedMeters)
					: uncompressedMeters;
				analytics = data.analytics;

				let formattedGrid = { ...data.state.grid };

				gridState = formattedGrid;
			}
		}
	} catch (error) {
		console.error(error);
		status = "idle";
	}
}
</script>
<main>
  <h1>Energy Trading Simulator</h1>

<br>
<h2>Run the simulation</h2>
  <div class="card">
    <p>The simulator uses real-life data to measure an estimate of power generation and average household consumption. It barely matters but it's a parameter nonetheless.</p>
  </div>
<form onsubmit={handleSubmit} method="POST">
    <div class="inputs">
      <label for="numMeters">Number of meters:</label>
      <input type="number" id="numMeters" name="numMeters" min="2" max="100" value="30" required>
      <label for="startDate">Start date:</label>
      <input type="datetime-local" id="startDate" name="startDate" value="2020-01-01T00:00" required>
    </div>
    <div class="button-row">
    <button type="submit" disabled={status === "running"}>Start</button>
    <button type="reset">Reset</button>
  </div>
</form>
  {#if status ==="running" || status === "done"}
  <h1>Simulation</h1>
  <h2>{time}</h2>
    <div class="card">
      <div class="meta-block">
	<JsonDisplayRow data={analytics} />
      </div>
      <div class="meta-block">
	<JsonDisplayRow data={gridState} />
      </div>
    </div>
     <div class="card">
    <Meters {meters} {tradeView} />
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

  .meta-block {
    border: 1px solid #ba6be5;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 1rem;
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
