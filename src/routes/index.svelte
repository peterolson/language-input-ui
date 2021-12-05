<script lang="ts">
	import Onboard from '../ui/account/onboard.svelte';
	import { settings } from '../data/settings';
	import ContentList from '../ui/content/ContentList.svelte';
	const { targetLanguages } = settings;

	let showOnboard = false;
	setTimeout(() => {
		showOnboard = $targetLanguages.length < 1;
	}, 1);
	function onStart() {
		showOnboard = false;
	}
</script>

<svelte:head>
	<title>Language input</title>
</svelte:head>

{#if showOnboard}
	<Onboard {onStart} />
{/if}

<ContentList requestHandler="/content/list?" showFilters={true} />
