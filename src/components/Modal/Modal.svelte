<script lang="ts">
	export let dialog: HTMLDialogElement;
</script>

<dialog bind:this={dialog}>
	<div class="header">
		<span>@</span>
		<span>Tytuł</span>
		<span
			tabindex="0"
			role="button"
			on:click={() => {
				dialog.close();
			}}
			on:keydown={(e) => {
				if (e.key === 'Enter') dialog.close();
			}}>X</span
		>
	</div>
	<div class="content">
		<slot />
	</div>
	<div class="actions"></div>
</dialog>

<style>
	dialog {
		width: 600px;
		height: 400px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid black;
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
		background-color: #000;
		color: #fff;
		border: 1px solid black;
	}
</style>
