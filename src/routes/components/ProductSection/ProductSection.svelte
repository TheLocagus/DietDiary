<script lang="ts">
	import Modal from "../../../components/Modal/Modal.svelte";
    import Pencil from 'svelte-material-icons/Pencil.svelte';
    import Delete from 'svelte-material-icons/Delete.svelte';
	import type { Product } from "../../types";

    export let product: Product;

    let dialog: HTMLDialogElement;

</script>

<div class="product">
    <div class="product-header">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="title" on:click={() => dialog.showModal()}>{product.productName} ({product.amount}g)</div>
        <div class="product-actions">
            <span role="button">
                <Pencil class='edit-button'/>
            </span>
            <span role="button">
                <Delete class='delete-button'/>
            </span>        
        </div>
    </div>
    <div class="values">
        <div><span>B:</span> {product.proteins}g</div>
        <div><span>W:</span> {product.carbo}g</div>
        <div><span>T:</span> {product.fats}g</div>
        <div><span>K:</span> {product.calories}kcal</div>
    </div>
    <div class="border"/>

</div>

<Modal bind:dialog/>

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
        padding: 4px 0
    }

    .values div span {
        font-size: 0.7em;
        font-weight: 400;
    }

    .values div {
        font-weight: 700;
    }

    span :global(svg) {
        vertical-align: middle;
    }

    span[role="button"]{
        cursor: pointer;
    }

    :global(.edit-button){
        color: var(--edit-btn);
    }

    :global(.delete-button) {
        color: var(--delete-btn);
    }
</style>