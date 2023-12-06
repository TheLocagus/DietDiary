<script lang="ts">
	import type { Meal } from '../../types';
	import DishSection from '../DishSection/DishSection.svelte';

	export let meal: Meal;
	export let index: number;
</script>

<div class="wrapper">
	<h1>Posiłek {index + 1} - {meal.mealName}</h1>
	<div class="dishes">
		{#each meal.dishes as dish}
			<DishSection {dish}/>
		{/each}
	</div>
	
</div>

<style>
	.wrapper {
		background-color: var(--cbg1);
	}

	h1 {
		margin: 0 auto;
		width: 98%;
		background-color: var(--cbg2);
		border: 1px solid var(--cbg3);
		border-radius: 5px;
		padding: 5px 15px;
		color: var(--fc);
	}

	.dishes {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 10px;
		gap: 10px;
	}
</style>
