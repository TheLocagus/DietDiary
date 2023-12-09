<script lang="ts">
	import type { Meal } from '../../types';
	import MealSection from '../MealSection/MealSection.svelte';

	export let day: string;
	export let meals: Meal[];
	export let index: number;
	export let daysCount: number;

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

Day {daysCount - index} <small>{day}</small>
{#each meals as meal}
	<MealSection {meal} />
{/each}

<div class="daily-count">
	<div>{day}</div>
	<div>Proteins: <span>{sum.proteins}</span>g</div>
	<div>Carbo: <span>{sum.carbo}</span>g</div>
	<div>Fats: <span>{sum.fats}</span>g</div>
	<div>Calories: <span>{sum.calories}</span>kcal</div>
</div>

<style>
	.daily-count {
		display: flex;
		justify-content: space-evenly;
		margin: 0 auto;
		width: 60%;
		background-color: var(--supp-bgc-dark);
		border: 1px solid var(--supp-bgc-light);
		color: var(--supp-fc);
		font-family: arial;
		padding: 10px 0;
		border-radius: 10px;
	}

	.daily-count span {
		font-weight: 700;
	}
</style>
