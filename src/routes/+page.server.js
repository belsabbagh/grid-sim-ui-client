export async function load({ fetch }) {
  const response = await fetch('http://localhost:5000/runs/running');
  const data = await response.json();
  return data;
}
