<script lang="ts">
	import type { Product } from "../../types";

    export let product: Product;
</script>

<div class="product">
    <div>
        <div>{product.productName} ({product.amount}g)</div>
        <div class="border"/>
    </div>
    <div class="values">
        <div><span>Białko:</span> {product.proteins} g</div>
        <div><span>Węglowodany:</span> {product.carbo} g</div>
        <div><span>Tłuszcze:</span> {product.fats} g</div>
        <div><span>Kalorie:</span> {product.calories} kcal</div>
    </div>
</div>

<style>
    .product {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-basis: 48%;
        margin-bottom: 16px;
        gap: 5px;
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
        align-items: center;
    }

    .values div {
        padding: 4px 0
    }

    .values div span {
        font-size: 0.85em;
    }
</style>