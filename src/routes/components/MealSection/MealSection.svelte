<script lang="ts">
	import { onMount } from 'svelte';
	import type { Meal } from '../../types';
	import DishSection from '../DishSection/DishSection.svelte';
	import { slide } from 'svelte/transition';

	export let meal: Meal;

	const SLIDE_DURATION_BY_CLICK = 250;

	onMount(() => {
		meal.expanded = meal.expanded ?? false;		
	})

	const getSummary = () => {
		const summary = meal.dishes.reduce((acc, curr) => {
			curr.products.forEach(product => {
				acc.proteins += product.proteins;
				acc.carbo += product.carbo;
				acc.fats += product.fats;
				acc.calories += product.calories;
			})

			return acc;
		}, {
			proteins: 0,
			carbo: 0,
			fats: 0,
			calories: 0,
		});

		const {proteins, carbo, fats, calories} = summary;

		return `${Number(proteins.toFixed(1))} / ${Number(carbo.toFixed(1))} / ${Number(fats.toFixed(1))} / ${Number(calories.toFixed(1))}`;
	}

</script>

<div class="wrapper">
	<div class="title">
		<button on:click={() => {
			meal.expanded = !meal.expanded;
		}}>
			{meal.expanded ? '-' : '+'}
		</button>
		<h1>{meal.mealName}</h1> 
		<span class="summary">({getSummary()})</span>
	</div>
	{#if meal.expanded}
		<div class="dishes" transition:slide={{duration: SLIDE_DURATION_BY_CLICK}}>
			{#each meal.dishes as dish (dish)}
				<DishSection {dish}/>
			{/each}
		</div>	
	{/if}
	
</div>

<style>
	.wrapper {
		background-color: var(--cbg1);
		margin-bottom: 1.6em;

	}

	.title {
		position: relative;
		display: flex;
		align-items: center;
		margin: 0 10px;
		background-color: var(--cbg2);
		border: 1px solid var(--cbg3);
		border-radius: 5px;
		padding: 5px 15px;
		color: var(--fc);
		box-shadow: 0 0 4px 2px var(--cbg3);
	}

	.title h1 {
		margin-left: 10px;
	}

	.title button {
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--supp-fc);
		border: 2px solid var(--supp-bgc-light);
		background-color: inherit;
		height: 20px;
		width: 20px;
		cursor: pointer;
		border-radius: 4px;
		transition: 0.2s;
	}

	.title .summary {
		font-size: 0.85em;
		margin-left: 10px;
		align-self: flex-end;
	}

	.title button:hover {
		background-color: var(--cbg3);
	}

	.dishes {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		gap: 10px;
		margin: 0 auto;
	}

</style>
