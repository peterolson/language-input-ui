<script>
	import { Icon } from '@smui/common';
</script>

<div class="mdc-typography--body1 container">
	<Icon class="material-icons">error</Icon>
	<div class="message">
		<slot />
	</div>
</div>

<style>
	.container {
		background-color: rgba(255, 50, 50, 0.2);
		padding: 8px;
		border-width: 1px;
		border-style: solid;
		border-color: rgba(255, 50, 50, 0.4);
		border-radius: 8px;
		display: flex;
		align-items: center;
		margin-bottom: 4px;
	}

	.message {
		flex: 1;
		margin-left: 8px;
	}
</style>
