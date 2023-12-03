<script lang="ts">
	import { getContext } from 'svelte';
	import type { AggregatedMeal, Meal, Summary } from './types';
	import { parseTimestampFromMsToDate } from '../utils/dates.utils';
	import { dates } from './utils';

	const meals = (getContext('mealsContext') as Meal[]) ?? [];


	let displayList: AggregatedMeal[] = []

	let totalValues: Summary = {
		proteins: '0',
		carbo: '0',
		fats: '0',
		calories: '0'
	};

	const getAllDates = (meal: Meal) => {
		const dateString = parseTimestampFromMsToDate(meal.date);
		dates.update(date => date.add(dateString));

		return $dates;
	}

	const getTotalValues = (meals: Meal[]) => {
		let proteins = 0;
		let carbo = 0;
		let fats = 0;
		let calories = 0;

		meals.forEach((meal) => {
			dates.set(getAllDates(meal));
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

	const getAggregatedMeals = (meals: Meal[]): AggregatedMeal[] => {
		const mealsAggregatedByDate: AggregatedMeal[] = [];
		
		$dates.forEach((date) => {
			let mealsWithSameDate = meals.filter(mealToFilter => parseTimestampFromMsToDate(mealToFilter.date) === date)

			mealsAggregatedByDate.push({
				[date]: mealsWithSameDate 
			})
		})

		return mealsAggregatedByDate;
	}

	$: if (meals) {
		totalValues = getTotalValues(meals);
		displayList = getAggregatedMeals(meals);
	}

</script>

<div>
	{#each meals as meal, i}
		<small>{meal.date}</small>
		<h1>Posiłek {i + 1} - {meal.mealName}</h1>
		{#each meal.dishes as dish}
			<h2>{dish.dishName}</h2>
			{#each dish.products as product}
				{@const { productName, amount, calories, carbo, fats, proteins } = product}
				<div>{productName}</div>
				<div>Białko: {proteins} g</div>
				<div>Węglowodany: {carbo} g</div>
				<div>Tłuszcze: {fats} g</div>
				<div>Kalorie: {calories} kcal</div>
				<div>Ilość: {amount}g</div>
				<br />
			{/each}
		{/each}
	{/each}
</div>
<div>~~~~~~~~~~~~~~~~~~~~~~</div>
<div>Totals:</div>
<div>Protein: {totalValues.proteins}</div>
<div>Carbo: {totalValues.carbo}</div>
<div>Fats: {totalValues.fats}</div>
<div>Calories: {totalValues.calories}</div>
