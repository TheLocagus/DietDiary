<script lang="ts">
	import { getContext } from "svelte";
	import type { AggregatedMeals } from "../types";
	import { parseTimestampFromMsToDate } from "../../utils/dates.utils";
    import { page } from '$app/stores'
    import Calendar from 'svelte-material-icons/Calendar.svelte';
    import SilverwareForkKnife from 'svelte-material-icons/SilverwareForkKnife.svelte'

    $: aggregatedMeals = (getContext('aggregatedMealsContext') as AggregatedMeals) ?? {};

</script>

<div class="diary-wrapper">
    <div class="days-list">
        <ul>
            {#each Object.entries(aggregatedMeals).reverse() as [date, meals]}
                <li class:active={date === $page.params.slug}>
                    <a href={`./${date}`}>
                        <div class="a-content">
                            <div class="date">
                                <Calendar size={"10%"}/>
                                <span>
                                    {parseTimestampFromMsToDate(Number(date))}
                                </span>
                            </div>
                            <div class="summary">
                                <SilverwareForkKnife size={"10%"}/>
                                <span>
                                    2100 
                                </span>
                            </div> 
                        </div>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
    <slot/>
</div>

<style>
    .diary-wrapper {
        margin: 10px;
        display: flex;
    }

    .days-list {
        min-height: calc(100vh - 40px);
        width: var(--aside-width);
        background-color: var(--cbg3);
        border-radius: 10px;
    }

    ul {
        width: 100%;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        border: 1px solid var(--cbg3);
        border-radius: 10px;
    }

    li {
        width: 95%;
        margin: 5px auto;
        border: 1px solid var(--cbg3);
        background-color: var(--cbg3);
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.2s;
        
    }

    li:hover {
        border: 1px solid var(--supp-bgc-dark);
    }

    a {
        display: block;
        text-decoration: none;
        color: black;
    }

    .a-content {
        /* display: flex;
        justify-content: space-between;
        align-items: center; */
        padding: 10px;
    }

    .a-content .date {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.8em;
        font-weight: bold;
    }

    .a-content .summary {
        margin-top: 5px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
        font-size: 0.7em;
    }

    .date :global(svg), .summary :global(svg) {
        width: 0.8em;
        height: 0.8em;
    }

    .date :global(svg) {
        margin-top: 2px;
    }

    .active {
        background-color: var(--supp-bgc-light);
    }

    .active a {
        cursor: default;
    }

    .active:hover {
        border: 1px solid var(--cbg3);
    }
</style>