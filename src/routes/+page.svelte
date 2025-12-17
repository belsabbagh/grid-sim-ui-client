<script>

  /**
   * @typedef {Object} Props
   * @property {import('./$types').PageData} data
   */

  /** @type {Props} */
  let { data } = $props();
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
