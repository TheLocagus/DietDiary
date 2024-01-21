<script lang="ts">
	import type { Dish } from '../../types';
	import ProductSection from '../ProductSection/ProductSection.svelte';

	export let dish: Dish;
	export let mealId: string;

	const getSummary = () => {
		const summary = dish.products.reduce(
			(acc, current) => {
				return {
					proteins: acc.proteins + current.proteins,
					carbo: acc.carbo + current.carbo,
					fats: acc.fats + current.fats,
					calories: acc.calories + current.calories
				};
			},
			{
				proteins: 0,
				carbo: 0,
				fats: 0,
				calories: 0
			}
		);

		const { proteins, carbo, fats, calories } = summary;

		return `${Number(proteins.toFixed(1))} / ${Number(carbo.toFixed(1))} / ${Number(
			fats.toFixed(1)
		)} / ${Number(calories.toFixed(1))}`;
	};
</script>

<div class="wrapper">
	<h2>{dish.dishName}</h2>
	<div class="products">
		{#each dish.products as product}
			<ProductSection {product} dishId={dish.id} {mealId} />
		{/each}
	</div>
	<div class="summary">
		<span>{getSummary()}</span>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: var(--cbg2);
		flex-basis: 32%;
		border-radius: 10px;
		border: 1px solid var(--cbg3);
		color: var(--fc);
		box-shadow: 0 0 2px 2px var(--cbg3);
	}

	h2 {
		text-align: center;
		background-color: var(--cbg3);
		padding: 10px 0;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		font-size: 0.9em;
	}

	.products {
		justify-content: center;
		flex-wrap: wrap;
		padding: 10px 10px 0 10px;
		font-size: 1.2em;
	}

	.summary {
		flex-grow: 1;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		padding: 0 15px 10px 5px;
		font-size: 0.9em;
	}
</style>
