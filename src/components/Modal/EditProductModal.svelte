<script lang="ts">
	import FormInput from '../FormInput/FormInput.svelte';
	import FormRow from '../FormRow/FormRow.svelte';
	import Switch from '../Switch/Switch.svelte';
	import Modal from './Modal.svelte';
	export let dialog: HTMLDialogElement;
	export let title: string;
	export let values: {
		proteins: number;
		carbo: number;
		fats: number;
		calories: number;
		productName: string;
		amount: number;
	};

	//TODO: disable save button when any error exists

	let isFullEditActive = false;
	const valuesMultiplier = values.amount / 100;

	const baseValues = {
		proteins: values.proteins / valuesMultiplier,
		carbo: values.carbo / valuesMultiplier,
		fats: values.fats / valuesMultiplier,
		calories: values.calories / valuesMultiplier,
	}

	const calculateMakroBasedOnAmount = () => {
		const newMultiplier = values.amount / 100;

		values.proteins = baseValues.proteins * newMultiplier
		values.carbo = baseValues.carbo * newMultiplier
		values.fats = baseValues.fats * newMultiplier
		values.calories = baseValues.calories * newMultiplier
	}

	const nameValidationLive = (value: string) => {
		return '';
	};

	const nameValidationOnFocusOut = (value: string): string => {
		if (!value.length) return 'Nazwa produktu nie może być pusta';
		return '';
	};

	const productValidationLive = (value: string): string => {
		if (isNaN(Number(value))) return 'Wartość powinna być liczbą';
		return '';
	};

	const productValidationOnFocusOut = (value: string) => {
		if (!value.length) return 'Wartość nie może być pusta';
		return '';
	};

	$: if(!isFullEditActive && values.amount){
		console.log('siema')
		calculateMakroBasedOnAmount();
	}
</script>

<Modal bind:dialog {title}>
	<form>
		<FormRow>
			<FormInput
				id={'product-name-input'}
				value={values.productName}
				label={'Nazwa'}
				onFocusOutValidation={nameValidationOnFocusOut}
				onKeyUpValidation={nameValidationLive}
				on:update={({ detail }) => {
					values.productName = detail.productName;
				}}
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
				disabled={!isFullEditActive}
				onFocusOutValidation={productValidationOnFocusOut}
				onKeyUpValidation={productValidationLive}
				on:update={({ detail }) => {
					values.proteins = detail;
				}}
			/>
		</FormRow>
		<FormRow>
			<FormInput
				id={'carbo-input'}
				value={values.carbo}
				label={'Węglowodany'}
				disabled={!isFullEditActive}
				onFocusOutValidation={productValidationOnFocusOut}
				onKeyUpValidation={productValidationLive}
				on:update={({ detail }) => {
					values.carbo = detail;
				}}
			/>
		</FormRow>
		<FormRow>
			<FormInput
				id={'fats-input'}
				value={values.fats}
				label={'Tłuszcze'}
				disabled={!isFullEditActive}
				onFocusOutValidation={productValidationOnFocusOut}
				onKeyUpValidation={productValidationLive}
				on:update={({ detail }) => {
					values.fats = detail;
				}}
			/>
		</FormRow>
		<FormRow>
			<FormInput
				id={'calories-input'}
				value={values.calories}
				label={'Kalorie'}
				disabled={!isFullEditActive}
				onFocusOutValidation={productValidationOnFocusOut}
				onKeyUpValidation={productValidationLive}
				on:update={({ detail }) => {
					values.calories = detail;
				}}
			/>
		</FormRow>
		{/key}
		<FormRow>
			<FormInput
				id={'amount-input'}
				value={values.amount}
				label={'Ilość'}
				onFocusOutValidation={productValidationOnFocusOut}
				onKeyUpValidation={productValidationLive}
				on:update={({ detail }) => {
					values.amount = detail;
				}}
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
