<script lang="ts">
	export let customMargin: string | undefined = undefined;
</script>

<div class="row" style:margin={customMargin ?? '6px 0'}>
	<slot />
</div>

<style>
	.row {
		display: flex;
		align-items: center;
	}
</style>
