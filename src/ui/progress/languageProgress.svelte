<script lang="ts">
	import type { KnowledgeScores, LanguageKnowledge } from '../../types/knowledge.types';
	import { getBreakdownByCategory, knowledgeStore } from '../../data/knowledge';
	import type { LanguageCode } from '../../types/dictionary.types';
	import { t } from '../../i18n/i18n';
	import ProgressCategory from './progressCategory.svelte';
	import { settings } from '../../data/settings';
	import ProgressChart from './progressChart.svelte';
	import { session } from '$app/stores';
	import Error from '../widgets/Error.svelte';

	export let language: LanguageCode;

	const { darkMode } = settings;

	const knowledge = ($knowledgeStore[language] || {}) as LanguageKnowledge;
	const knowledgeScores = (knowledge?.scores || {}) as KnowledgeScores;

	let breakdown: { type: string; items: { word: string; score: number; color: string }[] }[];
	$: {
		breakdown = getBreakdownByCategory(knowledgeScores, $darkMode);
	}

	function durationToTime(duration: number, t: (s: string) => string) {
		const days = Math.floor(duration / 86400);
		const hours = Math.floor((duration % 86400) / 3600);
		const minutes = Math.floor((duration % 3600) / 60);
		const seconds = Math.floor(duration % 60);
		const d = t('progress.day');
		const h = t('progress.hour');
		const m = t('progress.minute');
		const s = t('progress.second');
		if (days) {
			return `${days}${d} ${hours}${h} ${minutes}${m} ${seconds}${s}`;
		}
		if (hours) {
			return `${hours}${h} ${minutes}${m} ${seconds}${s}`;
		}
		if (minutes) {
			return `${minutes}${m} ${seconds}${s}`;
		}
		return `${seconds}${s}`;
	}
</script>

<div class="container">
	{#if !$session.user}
		<Error>
			{@html $t('progress.saveProgressWarning')}
		</Error>
	{/if}
	<ul class="mdc-typography--body1">
		<li>{$t('progress.totalWordsRead')}: {knowledge.totalWords}</li>
		<li>{$t('progress.totalTimeRead')}: {durationToTime(knowledge.totalSeconds, $t)}</li>
	</ul>
	<ProgressChart {language} />

	{#each breakdown as { type, items }}
		<ProgressCategory {type} {items} />
	{/each}
</div>

<style>
	.container {
		padding: 8px;
	}
</style>
