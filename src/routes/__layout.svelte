<script lang="ts">
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button/IconButton.svelte';
	import SettingsDialog from '../ui/settings/settingsDialog.svelte';

	let isSettingsOpen = false;
	function toggleSettings() {
		isSettingsOpen = !isSettingsOpen;
	}
</script>

<div class="container">
	<div class="topBar">
		<IconButton class="material-icons" on:click={toggleSettings}>settings</IconButton>
	</div>
	<div class="content"><slot /></div>
</div>

<SettingsDialog bind:open={isSettingsOpen} />

<style>
	.topBar {
		display: flex;
		justify-content: flex-end;
		border-bottom: 1px solid var(--border-color);
	}
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.content {
		display: flex;
		overflow: auto;
	}
</style>
