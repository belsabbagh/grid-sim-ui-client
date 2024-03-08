import { writable } from "svelte/store";

export let currentState = writable({
  meters: [],
});
