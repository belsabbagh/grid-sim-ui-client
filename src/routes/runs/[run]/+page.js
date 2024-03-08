


export async function load({fetch, params}) {
  const response = await fetch(`http://localhost:5000/runs/${params.run}`);
  const data = await response.json();
  const firstState = await fetch(`http://localhost:5000/runs/${params.run}/states/0`);
  const firstStateData = await firstState.json();
  return {
    runId: params.run,
    parameters: data.parameters,
    firstState: firstStateData,
  }
}
