<script lang="ts">
	export let message = '';
</script>

<div class="container">
	<div class="mdc-typography--headline4">404 Not Found</div>
	<hr />
	<div class="mdc-typography--body1">{message}</div>
</div>

<style>
	.container {
		width: 100%;
		text-align: center;
	}
</style>
