<script lang="ts">
	import type { Meal } from '../../types';
	import MealSection from '../MealSection/MealSection.svelte';

	export let day: string;
	export let meals: Meal[];
	export let index: number;

	let sum = {
		proteins: '0',
		carbo: '0',
		fats: '0',
		calories: '0'
	};
	const countDayMacro = (meals: Meal[]) => {
		let proteins = 0;
		let carbo = 0;
		let fats = 0;
		let calories = 0;
		meals.forEach((meal) => {
			meal.dishes.forEach((dish) =>
				dish.products.forEach((product) => {
					proteins += product.proteins;
					carbo += product.carbo;
					fats += product.fats;
					calories += product.calories;
				})
			);
		});

		return {
			proteins: (Math.round(proteins * 10) / 10).toFixed(1),
			carbo: (Math.round(carbo * 10) / 10).toFixed(1),
			fats: (Math.round(fats * 10) / 10).toFixed(1),
			calories: (Math.round(calories * 10) / 10).toFixed(1)
		};
	};

	$: if (meals) {
		sum = countDayMacro(meals);
	}
</script>

Day {index + 1} <small>{day}</small>
{#each meals as meal, i}
	<MealSection {meal} index={i} />
{/each}

<div>~~~~~~~~~~</div>
<div>{day}</div>
<div>Protein: {sum.proteins}</div>
<div>Carbo: {sum.carbo}</div>
<div>Fats: {sum.fats}</div>
<div>Calories: {sum.calories}</div>
<div>~~~~~~~~~~</div>
