<script>
  export let meters = [];
</script>

<div class="card-container">
    {#each meters as meter, index}
      <div class="meter-card" id={index.toString()} data-surplus-positive={meter.surplus >= 0}>
        <h3>Meter {meter.id}</h3>
        <p>Surplus: {parseFloat(meter.surplus.toFixed(5))}</p>
        <p style="min-width: 100px;">In Trade: {meter.in_trade}</p>
      </div>
    {/each}
</div>

<style>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    width: 100%;
  }

  .meter-card {
    min-width: 200px;
    border-width: 1px;
    border-style: solid;
    padding: 8px;
    border-radius: 20px;
  }

  /* Border color based on surplus */
  .meter-card {
    border-color: #FF0000; /* Default red */
  }
  .meter-card[data-surplus-positive="true"] {
    border-color: #00FF00; /* Green if surplus >= 0 */
  }
</style>
