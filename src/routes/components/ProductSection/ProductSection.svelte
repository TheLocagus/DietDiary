<script lang="ts">
	import Modal from "../../../components/Modal/Modal.svelte";
	import type { Product } from "../../types";

    export let product: Product;

    let dialog: HTMLDialogElement;

</script>

<div class="product">
    <div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="title" on:click={() => dialog.showModal()}>{product.productName} ({product.amount}g)</div>
        <div class="border"/>
    </div>
    <div class="values">
        <div><span>Białko:</span> {product.proteins} g</div>
        <div><span>Węglowodany:</span> {product.carbo} g</div>
        <div><span>Tłuszcze:</span> {product.fats} g</div>
        <div><span>Kalorie:</span> {product.calories} kcal</div>
    </div>
</div>

<Modal bind:dialog/>

<style>
    .product {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-basis: 33%;
        margin-bottom: 16px;
        gap: 5px;
        flex-grow: 1;
    }

    .title {
        text-align: center;
    }

    .border {
        height: 1px;
        width: 80%;
        margin: 5px auto 0;
        background-color: var(--cbg3);
    }

    .values {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
    }

    .values div {
        padding: 4px 0
    }

    .values div span {
        font-size: 0.85em;
        font-weight: 400;
    }

    .values div {
        font-weight: 700;
    }
</style>