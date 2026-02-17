<script>
let { meters = [], tradeView = false } = $props();
let displayMeters = $derived(
	meters.map((m) => ({
		...m,
		displaySurplus: tradeView ? m.s + m.p : m.s,
	})),
);
</script>
<div class="card-container">
    {#each displayMeters as meter, i}
      <div class="meter-card" id={i.toString()}
data-status={meter.displaySurplus > 0 ? 'positive' : meter.displaySurplus === 0 ? 'zero' : 'negative'}
    >
        <h3>Meter {meter.id}</h3>
        <p>Surplus: {Number.parseFloat(meter.displaySurplus)}</p>
        <p style="min-width: 100px;">{meter.f || '-'}</p>
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
    min-width: 150px;
    border-width: 1px;
    border-style: solid;
    padding: 8px;
    border-radius: 20px;
  }

/* Negative - Deep Crimson/Red */
.meter-card[data-status="negative"] {
  border-color: #FF4D4D; /* Slightly softer red for dark mode */
  background-color: rgba(255, 77, 77, 0.1); /* 10% opacity */
}

/* Positive - Emerald/Green */
.meter-card[data-status="positive"] {
  border-color: #00E676; /* Vibrant but not piercing green */
  background-color: rgba(0, 230, 118, 0.08); /* 8% opacity */
}

/* Zero - Special Amber/Bronze */
.meter-card[data-status="zero"] {
  border-color: #FFC107; /* Warm Gold/Amber */
  background-color: rgba(255, 193, 7, 0.12); /* 12% opacity for a soft glow */
}


  @media only screen and (max-width:720px) {
.meter-card {
      min-width: 100px;
    }
  }
</style>
