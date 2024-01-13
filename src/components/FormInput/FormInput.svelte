<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let id: string;
	export let value: string | number;
	export let label: string;
	export let disabled = false;
	export let onFocusOutValidation: (value: string) => string;
	export let onKeyUpValidation: (value: string) => string;

	const dispatch = createEventDispatcher();

	let errorMessages = {
		onFocusOut: '',
		onKeyUp: ''
	};

	const validate = (
		e: Event,
		method: (value: string) => string,
		type: 'onFocusOut' | 'onKeyUp'
	) => {
		const value = (e.target as HTMLInputElement).value;
		errorMessages[`${type}`] = method(value);
	};

	const updateForm = (e: Event) => {
			const errors = Object.values(errorMessages).filter((err) => err);
			if (errors.length) return;

			const value = (e.target as HTMLInputElement).value;
			dispatch('update', value);
		}

	$: if (disabled) {
		errorMessages = {
			onFocusOut: '',
			onKeyUp: ''
		};
		value = value;
	}
</script>

<label for={id}>{label}</label>
<div>
	<input
		{id}
		type="text"
		{value}
		{disabled}
		class:error={Object.values(errorMessages).filter((mess) => mess).length}
		on:focusout={(e) => validate(e, onFocusOutValidation, 'onFocusOut')}
		on:keyup={(e) => validate(e, onKeyUpValidation, 'onKeyUp')}
		on:change={(e) => updateForm(e)}
	/>
	{#each Object.values(errorMessages) as error}
		<span class="error-message">{error}</span>
	{/each}
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
