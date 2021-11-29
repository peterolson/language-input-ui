<script lang="ts">
	import IconButton, { Icon } from '@smui/icon-button';
	import { getExamples } from '../../data/dictionary';

	import type {
		BackTranslation,
		DictionaryExample,
		DictionaryTranslation,
		LanguageCode
	} from '../../types/dictionary.types';
	import { onMount } from 'svelte';
	import ExampleSentence from './exampleSentence.svelte';
	import Button from '@smui/button';
	import { Label } from '@smui/common';
	import { settings } from '../../data/settings';
	import { normalizeWord } from '../../data/knowledge';
	const { isTraditional } = settings;

	export let word: string;
	export let translation: DictionaryTranslation;
	export let fromLang: LanguageCode;
	export let toLang: LanguageCode;
	export let loadExamples: boolean;

	const DEFAULT_EXAMPLE_COUNT = 1;

	let examples: DictionaryExample[] = [];
	let limitExamples = true;
	let currentWord = word;
	let hasLoaded = false;

	async function populateExamples() {
		examples = await getExamples(word, translation.normalizedTarget, fromLang, toLang);
		hasLoaded = true;
	}

	onMount(() => {
		if (!loadExamples) return;
		populateExamples();
	});

	function toggleExampleLimit() {
		limitExamples = !limitExamples;
	}

	async function changeCurrentWord(newWord: string) {
		currentWord = newWord;
		examples = [];
		populateExamples();
	}

	function isCurrentWord(backtranslation: BackTranslation, currentWord: string) {
		return (
			normalizeWord(backtranslation.displayText) === normalizeWord(currentWord) ||
			normalizeWord(backtranslation.normalizedText) === normalizeWord(currentWord)
		);
	}

	function getExampleNum(currentWord: string, translation: DictionaryTranslation) {
		let count = translation?.backTranslations.find((backtranslation) =>
			isCurrentWord(backtranslation, currentWord)
		)?.numExamples;
		if (count) {
			return count;
		}
		return '';
	}
</script>

<div class="mdc-typography--subtitle1">
	{$isTraditional && translation.normalizedTargetTrad
		? translation.normalizedTargetTrad
		: translation.normalizedTarget}
</div>
<div class="mdc-typography--body1 grayed backTranslation">
	{#each translation.backTranslations as backtranslation}
		{#if isCurrentWord(backtranslation, currentWord)}
			<span class:currentWord={isCurrentWord(backtranslation, currentWord)}>
				{$isTraditional && backtranslation.displayTextTrad
					? backtranslation.displayTextTrad
					: backtranslation.displayText}
			</span>
		{:else}
			<Button
				color="secondary"
				on:click={() => changeCurrentWord(backtranslation.displayText)}
				style="min-width:0;text-transform:none;height:unset"
			>
				{$isTraditional && backtranslation.displayTextTrad
					? backtranslation.displayTextTrad
					: backtranslation.displayText}
			</Button>
		{/if}
		{' '}
	{/each}
</div>
{#if !loadExamples && !hasLoaded && getExampleNum(currentWord, translation) > 0}
	<Button color="secondary" on:click={populateExamples}>
		<Icon class="material-icons">unfold_more</Icon>
		<Label>{getExampleNum(currentWord, translation)}</Label>
	</Button>
{/if}
{#each examples.slice(0, limitExamples ? DEFAULT_EXAMPLE_COUNT : examples.length) as example}
	<ExampleSentence {example} />
{/each}
{#if examples.length > DEFAULT_EXAMPLE_COUNT}
	<Button color="secondary" on:click={toggleExampleLimit}>
		<Icon class="material-icons">
			{limitExamples ? 'expand_more' : 'expand_less'}
		</Icon>
		{#if limitExamples}
			<Label>{examples.length - DEFAULT_EXAMPLE_COUNT}</Label>
		{/if}
	</Button>
{/if}
<hr />

<style>
	hr {
		margin: 4px 0;
		opacity: 0.6;
	}

	.currentWord {
		font-weight: bold;
	}
</style>
