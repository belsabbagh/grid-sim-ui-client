<main>
  <h1>Welcome to the home page</h1>

<a href="/realtime">Visualize a real-time data stream</a>
<br>
<a href="/runs">Visualize a historical data stream</a>
<h2>Start a new run</h2>
<form action="/runs/start" method="POST">
  <label for="numMeters">Number of meters:</label>
  <input type="number" id="numMeters" name="numMeters" min="2" max="5000" value="12" required>
  <label for="startDate">Start date:</label>
  <input type="datetime-local" id="startDate" name="startDate" value="2010-01-01T00:00" required>
  <label for="endDate">End date:</label>
  <input type="datetime-local" id="endDate" name="endDate" value="2010-01-02T00:00" required>
  <div class="button-row">
    <button type="submit">Start</button>
    <button type="reset">Reset</button>
  </div>
</form>
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
 </style>
