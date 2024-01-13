<script lang="ts">
	import ExitIcon from 'svelte-material-icons/AlphaXCircleOutline.svelte';
	export let dialog: HTMLDialogElement;
	export let title: string;

	let divHeader: HTMLDivElement;
</script>

<dialog bind:this={dialog}>
	<div class="header" bind:this={divHeader}>
		<span>@</span>
		<span class="title">{title}</span>
		<button
			on:click={() => {
				dialog.close();
			}}
			on:keydown={(e) => {
				if (e.key === 'Enter') dialog.close();
			}}
		>
			<ExitIcon />
		</button>
	</div>
	<div class="content">
		<slot />
	</div>
	<div class="actions">
		<button>Anuluj</button>
		<button>Zapisz</button>
	</div>
</dialog>

<style>
	dialog {
		min-width: 400px;
		top: 50%;
		left: 50%;
		background-color: var(--cbg2);
		transform: translate(-50%, -50%);
		border: 1px solid var(--supp-bgc-dark);
		border-radius: 10px;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.511);
	}

	.header {
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		background-color: var(--cbg3);
		color: #fff;
	}

	.header .title {
		font-size: 0.8em;
	}

	.header button {
		background-color: transparent;
		cursor: pointer;
	}

	.header button :global(svg) {
		height: 2em;
		width: 2em;
		color: white;
	}

	.content {
		padding: 10px;
		min-height: 200px;
	}

	.actions {
		padding: 30px 30px 20px;
		display: flex;
		justify-content: flex-end;
	}

	.actions button {
		margin-left: 15px;
		padding: 5px 10px;
		background-color: var(--cbg2);
		border: 1px solid var(--supp-bgc-light);
		border-radius: 5px;
		color: var(--supp-fc);
		cursor: pointer;
		transition: 0.2s;
	}

	.actions button:hover {
		background-color: var(--supp-bgc-light);
	}
</style>
