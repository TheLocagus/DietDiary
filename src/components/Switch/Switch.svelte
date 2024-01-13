<script lang="ts">
	export let active: boolean;
	export let label: string;
	export let id: string;
</script>

<span
	role="button"
	tabindex="0"
	on:click={() => (active = !active)}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			active = !active;
		}
	}}>{label}</span
>
<div>
	<button {id} class:active on:click={() => (active = !active)}>
		<span class="circle" class:active></span>
	</button>
</div>

<style>
	span[role='button'] {
		flex-basis: 50%;
		font-size: 0.7em;
		padding-left: 40px;
		color: var(--supp-fc);
	}

	button {
		padding: 8px;
		width: 46px;
		border-radius: 20px;
		position: relative;
		background-color: var(--supp-bgc-dark);
		border: 1px solid black;
		transition: 0.4s;
		cursor: pointer;
	}

	button.active {
		background-color: var(--supp-bgc-light);
	}

	.circle {
		margin: 0 2px;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		display: block;
		background-color: var(--cbg3);
		border: 1px solid black;
		height: 12px;
		width: 12px;
		border-radius: 50%;
		transition: 0.4s ease;
	}

	.circle.active {
		left: calc(100% - 12px - 4px);
	}
</style>
