<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { Meal } from './types';

	const meals: Writable<Meal[]> = writable([]);

	$: setContext('mealsContext', $meals);

	const saveData = async () => {
		const req = await fetch('.', {
			method: 'POST',
			body: JSON.stringify($meals),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (req.status === 200) {
			console.log(req.statusText);
		} else {
			console.error(req.statusText);
		}
	};

	const loadData = async () => {
		const req = await fetch('.', {
			method: 'GET'
		});

		const res = await req.json();

		meals.set(res);
	};
</script>

<section class="data-buttons">
	<button disabled={$meals.length === 0} on:click={saveData}>Zapisz</button>
	<button on:click={loadData}>Wczytaj</button>
</section>

{#key $meals}
	<slot />
{/key}
