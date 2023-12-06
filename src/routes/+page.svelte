<script lang="ts">
	import { getContext } from 'svelte';
	import type { AggregatedMeals, Meal, Summary } from './types';
	import { parseTimestampFromMsToDate } from '../utils/dates.utils';
	import { dates } from './utils';
	import DaySection from './components/DaySection/DaySection.svelte';

	const meals = (getContext('mealsContext') as Meal[]) ?? [];

	let displayList: AggregatedMeals = {};

	let totalValues: Summary = {
		proteins: '0',
		carbo: '0',
		fats: '0',
		calories: '0'
	};

	const getAllDates = (meal: Meal) => {
		const dateString = parseTimestampFromMsToDate(meal.date);
		dates.update((date) => date.add(dateString));

		return $dates;
	};

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

	const getAggregatedMeals = (meals: Meal[]): AggregatedMeals => {
		let mealsAggregatedByDate: AggregatedMeals = {};

		$dates.forEach((date) => {
			let mealsWithSameDate = meals.filter(
				(mealToFilter) => parseTimestampFromMsToDate(mealToFilter.date) === date
			);

			const agregatedToParse = Object.entries(mealsAggregatedByDate);
			agregatedToParse.push([date, mealsWithSameDate]);
			mealsAggregatedByDate = Object.fromEntries(agregatedToParse);
		});

		return mealsAggregatedByDate;
	};

	$: if (meals) {
		totalValues = getTotalValues(meals);
		displayList = getAggregatedMeals(meals);
	}
</script>

<div>
	{#each Object.entries(displayList).reverse() as [day, meals], i}
		<DaySection {day} {meals} index={i} />
	{/each}
</div>
<div>~~~~~~~~~~~~~~~~~~~~~~</div>
<div>Totals:</div>
<div>Protein: {totalValues.proteins}</div>
<div>Carbo: {totalValues.carbo}</div>
<div>Fats: {totalValues.fats}</div>
<div>Calories: {totalValues.calories}</div>
