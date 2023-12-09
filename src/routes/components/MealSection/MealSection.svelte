<script lang="ts">
	import type { Meal } from '../../types';
	import DishSection from '../DishSection/DishSection.svelte';
	import { slide } from 'svelte/transition';

	export let meal: Meal;

	let mealExpanded = true;
</script>

<div class="wrapper">
	<div class="title">
		<span role="button" tabindex="0" on:click={() => mealExpanded = !mealExpanded} on:keypress>{mealExpanded ? '-' : '+'}</span>
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
	}

	.title {
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

	.title span {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--supp-bgc-light);
		color: var(--supp-fc);
		border: 3px solid var(--cbg3);
		height: 20px;
		width: 20px;
		cursor: pointer;
	}

	.dishes {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 10px;
		gap: 10px;
	}
	
</style>
