<script lang="ts">
	import Button, { Icon } from '@smui/button';
	import type { ContentItem } from '../../types/content.types';
	import { fade } from 'svelte/transition';
	import LanguageProgress from '../progress/languageProgress.svelte';
	import { t } from '../../i18n/i18n';
	import IconButton from '@smui/icon-button';

	export let content: ContentItem;
	export let newWords: string[];
	export let lookedUp: string[];

	const combined = Array.from(new Set([...lookedUp, ...newWords]));

	let isExpanded: boolean = false;
	let limit = 50;
</script>

<div class="container">
	{#if combined.length}
		<div style="padding:8px;">
			<div class="mdc-typography--headline6" in:fade={{ duration: 1000 }}>
				{$t('progress.newWords')}: {newWords.length + lookedUp.length}
			</div>
			<div class="newwords" class:expanded={isExpanded}>
				{#each combined.slice(0, limit) as word, i}
					<div class="mdc-typography--body2 word" in:fade>
						{word}
					</div>
				{/each}
				{#if combined.length > limit}
					<Button on:click={() => (limit = limit + 50)}>
						<Icon class="material-icons">expand_more</Icon>
					</Button>
				{/if}
			</div>
		</div>
	{/if}

	<div class="mdc-typography--body1" in:fade={{ duration: 1000, delay: 500 }}>
		<LanguageProgress language={content.lang} />

		<a href="/" class="ok" sveltekit:prefetch>
			<Button variant="unelevated">
				<Icon class="material-icons">done</Icon>
				OK
			</Button>
		</a>
	</div>
</div>

<style>
	.container {
		margin: auto;
	}
	a {
		text-decoration: none;
	}

	.newwords {
		padding: 8px;
		overflow: hidden;
	}

	.word {
		display: inline-block;
		margin: 2px;
		padding: 4px;
	}

	.ok {
		display: block;
		padding: 16px;
	}
</style>
