<script lang="ts">
	import type { Dish } from "../../types";
	import ProductSection from "../ProductSection/ProductSection.svelte";

    export let dish: Dish;
</script> 

<div class="wrapper">
    <h2>{dish.dishName}</h2>
    <div class="products">
		{#each dish.products as product}
			<ProductSection {product}/>
            {/each}
        </div>
</div>

<style>
    .wrapper {
        box-sizing: border-box;
        background-color: var(--cbg2);
        padding: 10px;
        flex-basis: 48%;
        border-radius: 10px;
        border: 1px solid var(--cbg3);
        color: var(--fc);
        font-family: "arial";

    }

    h2 {
        text-align: center;
    }

    .products {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>
