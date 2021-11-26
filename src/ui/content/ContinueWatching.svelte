<script lang="ts">
	import { t } from '../../i18n/i18n';

	import { viewProgressStore } from '../../data/viewProgress';

	export let id: string;
</script>

{#if id in $viewProgressStore}
	<div>{$t('content.continueWatching')}</div>
{/if}

<style>
	div {
		color: white;
		background-color: rgba(0, 0, 0, 0.7);
		display: inline;
		position: absolute;
		top: 0;
		left: 0;
		padding: 4px 8px;
		border-radius: 2px;
		letter-spacing: 0.5px;
		font-size: 0.9rem;
		line-height: 1.1rem;
		font-weight: 500;
		font-family: Roboto, Arial, sans-serif;
		text-transform: uppercase;
	}
</style>
