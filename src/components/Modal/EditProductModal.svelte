<script lang="ts">
	import { getContext } from 'svelte';
	import FormInput from '../FormInput/FormInput.svelte';
	import FormRow from '../FormRow/FormRow.svelte';
	import Switch from '../Switch/Switch.svelte';
	import Modal from './Modal.svelte';
	import type { MakroValidation } from './modal';
	import type { Meal, Product } from '../../routes/types';
	import type { Writable } from 'svelte/store';
	export let dialog: HTMLDialogElement;
	export let title: string;
	export let dishId: string;
	export let mealId: string;
	export let values: {
		id: string;
		proteins: number;
		carbo: number;
		fats: number;
		calories: number;
		productName: string;
		amount: number;
	};

	const meals: Writable<Meal[]> = getContext('mealsContext');

	let isFullEditActive = false;

	let errors: MakroValidation = {
		productName: '',
		proteins: '',
		carbo: '',
		fats: '',
		calories: '',
		amount: '',
	}

	const saveEdit = async(values: Product) => {

		console.log({mealId, dishId})

		const mealIndex = $meals.findIndex(meal => meal.id.toString() === mealId);
		const dishIndex = $meals[mealIndex].dishes.findIndex(dish => dish.id === dishId);
		const productIndex = $meals[mealIndex].dishes[dishIndex].products.findIndex(product => product.id === values.id);
		console.log({mealIndex, dishIndex, productIndex})
		if(mealIndex === undefined || dishIndex === undefined || productIndex === undefined) return;

		const product = $meals[mealIndex].dishes[dishIndex].products[productIndex];
		console.log(product);

		let mealsCopy = [...$meals];

		mealsCopy = mealsCopy.map(meal => {
			if(meal.expanded){
				meal.expanded = false;
				return meal;
			} else return meal;
		})

		mealsCopy[mealIndex].dishes[dishIndex].products[productIndex] = {
			...product,
			productName: values.productName,
			proteins: values.proteins,
			carbo: values.carbo,
			fats: values.fats,
			calories: values.calories,
			amount:values.amount,
		}

		const req = await fetch('../..', {
			method: 'POST',
			body: JSON.stringify(mealsCopy),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (req.status === 200) {
			console.log(req.statusText);

			const getReq = await fetch('../..', {
				method: 'GET'
			})

			const res = await getReq.json();

			meals.set(res);

		} else {
			console.error(req.statusText);
		}
		console.log(meals)
	}

	const valuesMultiplier = values.amount / 100;

	const baseValues = {
		proteins: values.proteins !== 0 ? values.proteins / valuesMultiplier : 0,
		carbo:values.carbo !== 0 ? values.carbo / valuesMultiplier : 0,
		fats: values.fats !== 0 ? values.fats / valuesMultiplier : 0,
		calories: values.calories !== 0 ? values.calories / valuesMultiplier : 0,
	}
	console.log(baseValues)

	const calculateMakroBasedOnAmount = () => {
		console.log(errors)
		if(errors.amount) return;

		const newMultiplier = values.amount / 100;

		console.log({...baseValues})

		values.proteins = baseValues.proteins !== 0 ? baseValues.proteins * newMultiplier : 0;
		values.carbo = baseValues.carbo !== 0 ? baseValues.carbo * newMultiplier : 0
		values.fats = baseValues.fats !== 0 ? baseValues.fats * newMultiplier : 0
		values.calories = baseValues.calories !== 0 ? baseValues.calories * newMultiplier : 0
	}

	const nameValidationLive = (value: string, field: keyof MakroValidation) => {
		if (!value.length) {
			errors[field] = 'Uzupełnij pole';
			return;
		}
		errors[field] = '';
	};

	const productValidationLive = (value: string, field: keyof MakroValidation) => {
		if (isNaN(Number(value))) {
			errors[field] = 'Podaj wartość liczbową';
			return;
		}

		if(!value.length) {
			errors[field] = 'Uzupełnij pole';
			return;
		}
		console.log('Czyszczenie pola z błędem')

		errors[field] = '';
	};

	$: if(!isFullEditActive && values.amount){
		calculateMakroBasedOnAmount();
	}

	$: if(!isFullEditActive){
		errors = {
			...errors,
			proteins: '',
			carbo: '',
			fats: '',
			calories: '',
		}
	}

</script>

<Modal bind:dialog {title} saveDisabled={!!Object.values(errors).some(error => error)} save={() => saveEdit(values)}>
	<form>
		<FormRow>
			<FormInput
				id={'product-name-input'}
				value={values.productName}
				label={'Nazwa'}
				errorMessage={errors.productName}
				field={"productName"}
				onKeyUpValidation={nameValidationLive}
				on:update={({ detail }) => {
					console.log(detail)
					values.productName = detail;
				}}
				on:errorUpdate={({detail}) => errors.productName = detail}
			/>
		</FormRow>
		<FormRow customMargin={'0 0 12px'}>
			<Switch id={'product-data-switch'} label={'Pełna edycja'} bind:active={isFullEditActive} />
		</FormRow>
		{#key isFullEditActive}
		<FormRow>
			<FormInput
				id={'proteins-input'}
				value={values.proteins}
				label={'Białko'}
				errorMessage={errors.proteins}
				field={"proteins"}
				disabled={!isFullEditActive}
				onKeyUpValidation={productValidationLive}
				on:update={({ detail }) => {
					values.proteins = detail;
				}}
				on:errorUpdate={({detail}) => {
					console.log('bialeczko')
					errors.proteins = detail}
				}

			/>
		</FormRow>
		<FormRow>
			<FormInput
				id={'carbo-input'}
				value={values.carbo}
				label={'Węglowodany'}
				errorMessage={errors.carbo}
				field={"carbo"}
				disabled={!isFullEditActive}
				onKeyUpValidation={productValidationLive}
				on:update={({ detail }) => {
					values.carbo = detail;
				}}
				on:errorUpdate={({detail}) => errors.carbo = detail}
			/>
		</FormRow>
		<FormRow>
			<FormInput
				id={'fats-input'}
				value={values.fats}
				label={'Tłuszcze'}
				errorMessage={errors.fats}
				field={"fats"}
				disabled={!isFullEditActive}
				onKeyUpValidation={productValidationLive}
				on:update={({ detail }) => {
					values.fats = detail;
				}}
				on:errorUpdate={({detail}) => errors.fats = detail}
			/>
		</FormRow>
		<FormRow>
			<FormInput
				id={'calories-input'}
				value={values.calories}
				label={'Kalorie'}
				errorMessage={errors.calories}
				field={"calories"}
				disabled={!isFullEditActive}
				onKeyUpValidation={productValidationLive}
				on:update={({ detail }) => {
					values.calories = detail;
				}}
				on:errorUpdate={({detail}) => errors.calories = detail}
			/>
		</FormRow>
		{/key}
		<FormRow>
			<FormInput
				id={'amount-input'}
				value={values.amount}
				label={'Ilość'}
				errorMessage={errors.amount}
				field={"amount"}
				onKeyUpValidation={productValidationLive}
				on:update={({ detail }) => {
					console.log(detail)
					console.log(values)
					values.amount = detail;
				}}
				on:errorUpdate={({detail}) => errors.amount = detail}
			/>
		</FormRow>
	</form>
</Modal>
<style>
	form {
		display: flex;
		flex-direction: column;
	}
</style>
