<script lang="ts">
	import Modal from './Modal.svelte';
	export let dialog: HTMLDialogElement;
</script>

<Modal bind:dialog>
	<form>
		<label for="proteins-input">Białko</label>
		<input id="proteins-input" type="text" />
	</form>
</Modal>
