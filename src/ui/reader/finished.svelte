<script lang="ts">
	import Button, { Icon } from '@smui/button';
	import { getColor, getScore, knowledgeStore } from '../../data/knowledge';
	import type { ContentItem } from '../../types/content.types';
	import { fade } from 'svelte/transition';
	import LanguageProgress from '../progress/languageProgress.svelte';
	import { settings } from '../../data/settings';
	import { t } from '../../i18n/i18n';
	import IconButton from '@smui/icon-button';

	export let content: ContentItem;
	export let newWords: string[];
	export let lookedUp: string[];

	const combined = Array.from(new Set([...lookedUp, ...newWords]));

	const knowledge = $knowledgeStore[content.lang] || {};
	const { darkMode } = settings;

	function wordColor(word: string, isDark: boolean) {
		return getColor(isDark, getScore(knowledge, word));
	}

	let wordsDiv: HTMLDivElement;
	let isExpanded: boolean = false;

	function canExpand(wordsDiv: HTMLDivElement) {
		if (!wordsDiv) {
			return false;
		}
		return wordsDiv.scrollHeight > wordsDiv.clientHeight;
	}
</script>

{#if combined.length}
	<div style="padding:8px;">
		<div class="mdc-typography--headline6" in:fade={{ duration: 1000 }}>
			{$t('progress.newWords')}: {newWords.length + lookedUp.length}
		</div>
		<div class="newwords" bind:this={wordsDiv} class:expanded={isExpanded}>
			{#each combined as word, i}
				<div
					class="mdc-typography--body2 word"
					style={`background-color:${wordColor(word, $darkMode)}`}
					in:fade={{ duration: 1000, delay: i * 75 }}
				>
					{word}
				</div>
			{/each}
		</div>
		{#if canExpand(wordsDiv)}
			<IconButton class="material-icons" on:click={() => (isExpanded = !isExpanded)}>
				{isExpanded ? 'expand_less' : 'expand_more'}
			</IconButton>
		{/if}
	</div>
{/if}

<div class="mdc-typography--body1" in:fade={{ duration: 1000, delay: 1500 }}>
	<LanguageProgress language={content.lang} />

	<a href="/" sveltekit:prefetch>
		<Button>
			<Icon class="material-icons">done</Icon>
			OK
		</Button>
	</a>
</div>

<style>
	a {
		text-decoration: none;
	}

	.newwords {
		padding: 8px;
		max-height: 128px;
		overflow: hidden;
	}
	.newwords.expanded {
		max-height: none;
	}

	.word {
		display: inline-block;
		margin: 2px;
		padding: 4px;
		border: 1px solid var(--border-color);
		border-radius: 4px;
	}
</style>
