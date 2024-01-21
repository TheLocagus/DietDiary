<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { AggregatedMeals, Dish, Meal, Product } from './types';
	import { dates } from './utils';
	import { getTimestamp, parseTimestampFromMsToDate } from '../utils/dates.utils';
	import Github from 'svelte-material-icons/Github.svelte';

	let isAddMealModalOpen = false;

	interface NewProduct {
		proteins: number;
		carbo: number;
		fats: number;
		calories: number;
		amount: number;
		name: string;
	}

	let newProduct: NewProduct = {
		proteins: 0,
		carbo: 0,
		fats: 0,
		calories: 0,
		amount: 0,
		name: ''
	};

	const meals: Writable<Meal[]> = writable([]);
	const aggregatedMeals: Writable<AggregatedMeals> = writable({});

	$: setContext('mealsContext', meals);
	setContext('aggregatedMealsContext', $aggregatedMeals);

	const saveData = async () => {
		const req = await fetch('.', {
			method: 'POST',
			body: JSON.stringify($meals),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (req.status === 200) {
			console.log(req.statusText);
		} else {
			console.error(req.statusText);
		}
	};

	const loadData = async () => {
		const req = await fetch('/', {
			method: 'GET'
		});

		const res = await req.json();

		meals.set(res);
	};

	const addProduct = () => {
		isAddMealModalOpen = true;
	};

	const addDish = () => {
		const lastMeal = $meals[$meals.length - 1];
		// const lastDish = lastMeal.dishes[lastMeal.dishes.length - 1];

		const newDish: Dish = {
			id: new Date().getTime().toString(),
			dishName: `Posiłek ${$meals.length} - danie ${lastMeal.dishes.length + 1}`,
			products: []
		};

		lastMeal.dishes = [...lastMeal.dishes, newDish];

		$meals[$meals.length - 1].dishes = lastMeal.dishes;
		$meals = $meals;
	};

	const addMeal = () => {
		const newMeal: Meal = {
			id: $meals.length + 1,
			date: new Date().getTime(),
			mealName: `Posiłek ${$meals.length + 1}`,
			dishes: []
		};

		$meals = [...$meals, newMeal];
	};

	const handleForm = (newProduct: NewProduct) => {
		const lastMeal = $meals[$meals.length - 1];
		const lastDish = lastMeal.dishes[lastMeal.dishes.length - 1];

		const product: Product = {
			id: `${$meals.length} - ${lastMeal.dishes.length} - ${new Date().getTime()}`,
			proteins: newProduct.proteins,
			carbo: newProduct.carbo,
			fats: newProduct.fats,
			calories: newProduct.calories,
			amount: newProduct.amount,
			productName: newProduct.name
		};

		lastDish.products = [...lastDish.products, product];

		$meals[$meals.length - 1].dishes[lastMeal.dishes.length - 1] = lastDish;
		$meals = $meals;
	};

	const getAllDates = (meal: Meal) => {
		const dateString = parseTimestampFromMsToDate(meal.date);
		dates.update((date) => date.add(dateString));

		return $dates;
	};

	const getAggregatedMeals = (meals: Meal[]): AggregatedMeals => {
		let mealsAggregatedByDate: AggregatedMeals = {};

		meals.forEach((meal) => {
			dates.set(getAllDates(meal));
		});

		$dates.forEach((date) => {
			let mealsWithSameDate = meals.filter(
				(mealToFilter) => parseTimestampFromMsToDate(mealToFilter.date) === date
			);

			const agregatedToParse = Object.entries(mealsAggregatedByDate);
			agregatedToParse.push([getTimestamp(date), mealsWithSameDate]);
			mealsAggregatedByDate = Object.fromEntries(agregatedToParse);
		});
		return mealsAggregatedByDate;
	};

	$: if (meals) {
		// totalValues = getTotalValues(meals);
		aggregatedMeals.set(getAggregatedMeals($meals));
		setContext('aggregatedMealsContext', $aggregatedMeals);
	}

	$: if ($meals) {
		console.log('siemanko');
	}
</script>

<header>
	<div class="name">
		<span>Meal diary</span>
	</div>
	<div class="links">
		<a href="/">Oblicz kalorie</a>
		<a href="/diary/general">Historia</a>
	</div>
	<div class="additional-actions">
		<a target="_blank" href="https://github.com/TheLocagus/DietDiary">
			<Github />
		</a>
	</div>
</header>

<section class="data-buttons">
	<button disabled={$meals.length === 0} on:click={saveData}>Zapisz</button>
	<button disabled={$meals.length !== 0} on:click={loadData}>Wczytaj</button>
	<button on:click={addProduct}>Dodaj produkt do ostatniego dania</button>
	<button on:click={addDish}>Dodaj danie do ostatniego posiłku</button>
	<button on:click={addMeal}>Dodaj posiłek</button>
</section>

{#if isAddMealModalOpen}
	<div class="inputs">
		<input type="text" bind:value={newProduct.name} placeholder="Name" />
		<input type="number" bind:value={newProduct.proteins} placeholder="proteins" />
		<input type="number" bind:value={newProduct.carbo} placeholder="carbo" />
		<input type="number" bind:value={newProduct.fats} placeholder="fats" />
		<input type="number" bind:value={newProduct.calories} placeholder="calories" />
		<input type="number" bind:value={newProduct.amount} placeholder="amount" />
		<button on:click={() => handleForm(newProduct)}>Dodaj</button>
	</div>
{/if}

{#key $meals}
	<slot />
{/key}

<style>
	:global(body) {
		background-color: var(--cbg1);
	}

	header {
		display: flex;
		align-items: center;
		width: 100%;
		background-color: var(--cbg3);
		height: 40px;
		font-size: 0.85em;
	}

	header .name {
		margin: 0 var(--between-sections-margin);
		flex-basis: calc(var(--aside-width) - calc(var(--layout-margin) * 2));
		text-align: center;
		font-style: italic;
	}

	header .links {
		display: flex;
		flex-grow: 1;
		height: 100%;
		margin: 0 var(--between-sections-margin);
	}

	header .links a {
		display: flex;
		align-items: center;
		height: 100%;
		padding-right: 15px;
		background-color: transparent;
		border: 1px solid transparent;
		text-decoration: none;
		color: inherit;
		cursor: pointer;
		transition: 0.2s;
	}

	header .links a:hover {
		opacity: 0.6;
	}

	header .additional-actions {
		padding: 0 20px;
	}

	header .additional-actions a {
		display: block;
		width: 2em;
		height: 2em;
		color: inherit;
	}

	header .additional-actions :global(svg) {
		width: 2em;
		height: 2em;
	}

	.inputs {
		position: fixed;
		display: flex;
		flex-direction: column;
		width: 200px;
		margin-bottom: 200px;
	}
</style>
