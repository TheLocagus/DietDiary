<script lang="ts">
	import type { Dish } from "../../types";
	import ProductSection from "../ProductSection/ProductSection.svelte";

    export let dish: Dish;
</script> 

<div class="wrapper" >
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
        flex-basis: 48%;
        border-radius: 10px;
        border: 1px solid var(--cbg3);
        color: var(--fc);
        box-shadow: 0 0 2px 2px var(--cbg3);
    }

    h2 {
        text-align: center;
        background-color: var(--cbg3);
        padding: 10px 0;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        font-size: 1em;
    }

    .products {
        justify-content: center;
        flex-wrap: wrap;
        padding: 10px;
        font-size: 1.2em;
    }
</style>
