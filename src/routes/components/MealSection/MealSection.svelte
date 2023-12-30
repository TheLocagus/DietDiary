<script lang="ts">
	import type { Meal } from '../../types';
	import DishSection from '../DishSection/DishSection.svelte';
	import { slide } from 'svelte/transition';

	export let meal: Meal;

	$: mealExpanded = true;
</script>

<div class="wrapper">
	<div class="title">
		<button on:click={() => mealExpanded = !mealExpanded} on:keypress>{mealExpanded ? '-' : '+'}</button>
		<h1>{meal.mealName}</h1> 
	</div>
	{#if mealExpanded}
		<div class="dishes" transition:slide>
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
		margin: 0 auto;
		width: 98%;
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

	.title button:hover {
		background-color: var(--cbg3);
	}

	.dishes {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 10px;
		gap: 10px;
	}

</style>
