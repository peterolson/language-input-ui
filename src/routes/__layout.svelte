<script lang="ts">
	import { session } from '$app/stores';
	import { setSession } from '../data/session';
	import IconButton from '@smui/icon-button';
	import { historyStore } from '../data/history';
	import { knowledgeStore } from '../data/knowledge';
	import SettingsDialog from '../ui/settings/settingsDialog.svelte';
	import { page } from '$app/stores';
	import localforage from 'localforage';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import { objectToArray } from '../data/util';

	setSession($session);
	let isSettingsOpen = false;
	function toggleSettings() {
		isSettingsOpen = !isSettingsOpen;
	}

	if (browser) {
		(async () => {
			if ($page.query.get('logout')) {
				localStorage.clear();
				await localforage.clear();
				goto('/');
				window.location.reload();
			}
		})();
	}
</script>

<div class="container">
	<div class="topBar">
		<div class="mdc-typography--headline6">
			<a sveltekit:prefetch href="/">
				<span class="titleIcon">
					<IconButton class="material-icons">home</IconButton>
				</span>
				<span class="title">Language Input</span>
			</a>
		</div>
		<div>
			<a href="/add" sveltekit:prefetch>
				<IconButton class="material-icons" color="secondary">add_box</IconButton>
			</a>
			{#if objectToArray($historyStore).length}
				<a href="/content/history" sveltekit:prefetch>
					<IconButton class="material-icons" color="secondary">history</IconButton>
				</a>
			{/if}
			{#if Object.keys($knowledgeStore).length}
				<a href="/progress" sveltekit:prefetch>
					<IconButton class="material-icons" color="secondary">insights</IconButton>
				</a>
			{/if}
			<IconButton class="material-icons" on:click={toggleSettings}>settings</IconButton>
			{#if !$session.user}
				<a href="/account/login" sveltekit:prefetch>
					<IconButton class="material-icons" color="secondary">login</IconButton>
				</a>
			{/if}
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
	.titleIcon {
		vertical-align: middle;
		display: none;
	}
	@media (max-width: 410px) {
		.titleIcon {
			display: inline;
		}
		.title {
			display: none;
		}
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
