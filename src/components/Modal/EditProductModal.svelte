<script lang="ts">
	import Modal from './Modal.svelte';
	export let dialog: HTMLDialogElement;
	export let values: {
		proteins: number;
		carbo: number;
		fats: number;
		calories: number;
		productName: string;
		amount: number;
	};
	export let title: string;

	let isFullEditActive = false;

	$: console.log(isFullEditActive);
</script>

<Modal bind:dialog {title}>
	<form>
		<div class="row">
			<label for="product-name-input">Nazwa</label>
			<div>
				<input id="product-name-input" type="text" value={values.productName} />
				<span class="error-message"></span>
			</div>
		</div>
		<div class="row">
			<span
				role="button"
				tabindex="0"
				on:click={() => (isFullEditActive = !isFullEditActive)}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						isFullEditActive = !isFullEditActive;
					}
				}}>Pełna edycja</span
			>
			<div>
				<!-- <input id="product-data-switch" type="checkbox" value={isFullEditActive} on:change={() => isFullEditActive = !isFullEditActive}/> -->
				<button
					id="product-data-switch"
					class:active={isFullEditActive}
					on:click={() => (isFullEditActive = !isFullEditActive)}
				>
					<span class="circle" class:active={isFullEditActive}></span>
				</button>
				<span class="error-message"></span>
			</div>
		</div>
		<div class="row">
			<label for="proteins-input">Białko</label>
			<div>
				<input
					id="proteins-input"
					type="text"
					value={values.proteins}
					disabled={!isFullEditActive}
				/>
				<span class="error-message"></span>
			</div>
		</div>
		<div class="row">
			<label for="carbo-input">Węglowodany</label>
			<div>
				<input id="carbo-input" type="text" value={values.carbo} disabled={!isFullEditActive} />
				<span class="error-message"></span>
			</div>
		</div>
		<div class="row">
			<label for="fats-input">Tłuszcze</label>
			<div>
				<input id="fats-input" type="text" value={values.fats} disabled={!isFullEditActive} />
				<span class="error-message"></span>
			</div>
		</div>
		<div class="row">
			<label for="calories-input">Kalorie</label>
			<div>
				<input
					id="calories-input"
					type="text"
					value={values.calories}
					disabled={!isFullEditActive}
				/>
				<span class="error-message"></span>
			</div>
		</div>
		<div class="row">
			<label for="amount-input">Ilość</label>
			<div>
				<input id="amount-input" type="text" value={values.amount} />
				<span class="error-message"></span>
			</div>
		</div>
	</form>
</Modal>

<style>
	form {
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
		align-items: center;
		margin: 10px 0;
	}

	label,
	.row > span {
		flex-basis: 50%;
		font-size: 0.7em;
		padding-left: 40px;
		color: var(--supp-fc);
	}

	input {
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

	button {
		padding: 12px;
		width: 60px;
		height: 20px;
		border-radius: 20px;
		position: relative;
		background-color: var(--supp-bgc-dark);
		border: 1px solid black;
		transition: 0.4s;
		cursor: pointer;
	}

	button.active {
		background-color: var(--supp-bgc-light);
	}

	.circle {
		margin: 0 2px;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		display: block;
		background-color: var(--cbg3);
		border: 1px solid black;
		height: 18px;
		width: 18px;
		border-radius: 50%;
		transition: 0.4s;
	}

	.circle.active {
		left: calc(100% - 20px - 2px);
	}
</style>
