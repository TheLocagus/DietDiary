<script lang="ts">
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import Delete from 'svelte-material-icons/Delete.svelte';
	import type { Product } from '../../types';
	import EditProductModal from '../../../components/Modal/EditProductModal.svelte';

	export let product: Product;

	let editDialog: HTMLDialogElement;
</script>

<div class="product">
	<div class="product-header">
		<div class="title">
			{product.productName} ({product.amount}g)
		</div>
		<div class="product-actions">
			<button
				on:click={() => {
					editDialog.showModal();
				}}
			>
				<Pencil class="edit-button" />
			</button>
			<button>
				<Delete class="delete-button" />
			</button>
		</div>
	</div>
	<div class="values">
		<div><span>B:</span> {product.proteins}g</div>
		<div><span>W:</span> {product.carbo}g</div>
		<div><span>T:</span> {product.fats}g</div>
		<div><span>K:</span> {product.calories}kcal</div>
	</div>
	<div class="border" />
</div>

<EditProductModal
	bind:dialog={editDialog}
	values={{
		proteins: product.proteins,
		carbo: product.carbo,
		fats: product.fats,
		calories: product.calories,
		productName: product.productName,
		amount: product.amount
	}}
	title={'Edytuj'}
/>

<style>
	.product {
		display: flex;
		flex-direction: column;
		flex-basis: 33%;
		margin-bottom: 16px;
		gap: 5px;
		flex-grow: 1;
	}

	.product-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		font-size: 0.8em;
	}

	.border {
		height: 1px;
		width: 80%;
		margin: 5px auto 0;
		background-color: var(--cbg3);
	}

	.values {
		display: flex;
		font-size: 0.8em;
		gap: 0.7em;
	}

	.values div {
		padding: 4px 0;
	}

	.values div span {
		font-size: 0.7em;
		font-weight: 400;
	}

	.values div {
		font-weight: 700;
	}

	button :global(svg) {
		height: 1.3em;
		width: 1.3em;
		vertical-align: middle;
	}

	button {
		background-color: transparent;
		cursor: pointer;
	}

	:global(.edit-button) {
		color: var(--edit-btn);
	}

	:global(.delete-button) {
		color: var(--delete-btn);
	}
</style>
