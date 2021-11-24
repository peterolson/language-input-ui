<script lang="ts">
	import { t } from '../../i18n/i18n';

	import { knowledgeStore } from '../../data/knowledge';
	import type { LanguageCode } from '../../types/dictionary.types';
	import LanguageProgress from './languageProgress.svelte';

	let languages: LanguageCode[];

	$: {
		languages = Object.keys($knowledgeStore) as LanguageCode[];
	}
</script>

<div class="container">
	{#if !languages.length}
		<div class="mdc-typography--body1 error">
			{$t('progress.empty')}
		</div>
	{/if}
	{#each languages as language}
		<LanguageProgress {language} />
	{/each}
</div>

<style>
	.error {
		padding: 8px;
	}
	.container {
		width: 100%;
		max-width: 640px;
		margin: auto;
		height: 100%;
		overflow: auto;
	}
</style>
