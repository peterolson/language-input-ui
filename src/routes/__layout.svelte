<script lang="ts">
	import IconButton from '@smui/icon-button';
	import { knowledgeStore } from '../data/knowledge';
	import SettingsDialog from '../ui/settings/settingsDialog.svelte';

	let isSettingsOpen = false;
	function toggleSettings() {
		isSettingsOpen = !isSettingsOpen;
	}
</script>

<div class="container">
	<div class="topBar">
		<div class="mdc-typography--headline6">
			<a sveltekit:prefetch href="/">Language Input</a>
		</div>
		<div>
			{#if Object.keys($knowledgeStore).length}
				<a href="/progress" sveltekit:prefetch>
					<IconButton class="material-icons" color="secondary">insights</IconButton>
				</a>
			{/if}
			<IconButton class="material-icons" on:click={toggleSettings}>settings</IconButton>
		</div>
	</div>
	<div class="content"><slot /></div>
</div>

<SettingsDialog bind:open={isSettingsOpen} />

<style>
	a {
		text-decoration: none;
		color: unset;
	}
	.topBar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 8px;
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
		height: 100%;
	}
</style>
