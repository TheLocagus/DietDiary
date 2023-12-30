<script lang="ts">
	import { getContext } from 'svelte';
	import type { AggregatedMeals, Meal, Summary } from '../../types';


    import type { PageData } from './$types';
	import MealSection from '../../components/MealSection/MealSection.svelte';
	
	export let data: PageData;

	$: aggregatedMeals = (getContext('aggregatedMealsContext') as AggregatedMeals) ?? [];

	let totalValues: Summary = {
		proteins: '0',
		carbo: '0',
		fats: '0',
		calories: '0'
	};

	// const getTotalValues = (meals: Meal[]) => {
	// 	let proteins = 0;
	// 	let carbo = 0;
	// 	let fats = 0;
	// 	let calories = 0;

	// 	meals.forEach((meal) => {
	// 		dates.set(getAllDates(meal));
	// 		meal.dishes.forEach((dish) =>
	// 			dish.products.forEach((product) => {
	// 				proteins += product.proteins;
	// 				carbo += product.carbo;
	// 				fats += product.fats;
	// 				calories += product.calories;
	// 			})
	// 		);
	// 	});

	// 	return {
	// 		proteins: (Math.round(proteins * 10) / 10).toFixed(1),
	// 		carbo: (Math.round(carbo * 10) / 10).toFixed(1),
	// 		fats: (Math.round(fats * 10) / 10).toFixed(1),
	// 		calories: (Math.round(calories * 10) / 10).toFixed(1)
	// 	};
	// };

	let meals: Meal[] = [];

	$: if(data){
		if(data.id){
			meals = aggregatedMeals[data.id]
		} else {
			meals = [];
		}
	}


	
</script>

<section>
	<div>
		{#if meals}
		{#each meals as meal}
			<MealSection {meal} />
		{/each}
		{/if}
	</div>
</section>

<style>
	section {
		width: 100%;
		margin: 0 10px;
	}
</style>

