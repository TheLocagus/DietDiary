<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte';
	import type { MakroValidation } from '../Modal/modal';

	export let id: string;
	export let value: string | number;
	export let label: string;
	export let field: keyof MakroValidation;
	export let disabled = false;
	export let errorMessage: string;
	export let onKeyUpValidation: (value: string, field: keyof MakroValidation) => void;

	const dispatch = createEventDispatcher();

	const validateKeyUp = async (e: KeyboardEvent) => {
		const value = (e.target as HTMLInputElement).value;
		console.log(value);
		onKeyUpValidation(value, field);
		await tick();
		if (!errorMessage) {
			dispatch('update', value);
		}
	};
</script>

<label for={id}>{label}</label>
<div>
	<input
		{id}
		type="text"
		{value}
		{disabled}
		class:error={errorMessage}
		on:keyup={(e) => validateKeyUp(e)}
	/>
	{#if errorMessage}
		<span class="error-message">{errorMessage}</span>
	{/if}
</div>

<style>
	label {
		flex-basis: 50%;
		font-size: 0.7em;
		padding-left: 40px;
		color: var(--supp-fc);
	}

	input {
		width: 150px;
		padding: 7px;
		font-size: 0.6em;
		background-color: var(--cbg3);
		border: 1px solid var(--supp-bgc-light);
		color: var(--supp-fc);
		border-radius: 5px;
	}

	input:disabled {
		background-color: var(--cbg2);
		color: var(--cbg1);
		cursor: not-allowed;
	}

	.error {
		border: 1px solid var(--red);
	}

	.error-message {
		width: 150px;
		display: block;
		font-size: 0.5em;
		font-weight: bold;
		color: var(--red);
		word-spacing: 1px;
	}
</style>
