<script lang="ts">
    export let open: boolean;

    $: console.log(open)

    let dialog: HTMLDialogElement;
    //używać metod do kontrolowania modala które ma wbudowane
</script>

<dialog {open} bind:this={dialog}>
    <div class="wrapper">
        <div class="header">
            <span tabindex="0" role="button" on:click={() => {
                open = false
            }} on:keydown>X</span>
        </div>
        <div class="content">
            siemanko
        </div>
        <div class="actions"></div>
    </div> 
</dialog>

<style>
    dialog {
        width: 600px;
        height: 400px;

    }

    dialog::backdrop {
        background-color: yellow;
    }

    .header {
        display: flex;
        height: 50px;
        background-color: #000;
        color: #fff;
    }
</style>