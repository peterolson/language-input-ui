<script lang="ts">
	import IconButton from '@smui/icon-button';
	import { getExamples } from '../../data/dictionary';

	import type {
		BackTranslation,
		DictionaryExample,
		DictionaryTranslation,
		LanguageCode
	} from '../../types/dictionary.types';
	import { onMount } from 'svelte';
	import ExampleSentence from './exampleSentence.svelte';
	import Button from '@smui/button/Button.svelte';

	export let word: string;
	export let translation: DictionaryTranslation;
	export let fromLang: LanguageCode;
	export let toLang: LanguageCode;

	let examples: DictionaryExample[] = [];
	let limitExamples = true;
	let currentWord = word;

	onMount(async () => {
		examples = await getExamples(word, translation.normalizedTarget, fromLang, toLang);
	});

	function toggleExampleLimit() {
		limitExamples = !limitExamples;
	}

	async function changeCurrentWord(newWord: string) {
		currentWord = newWord;
		examples = [];
		examples = await getExamples(currentWord, translation.normalizedTarget, fromLang, toLang);
	}

	function isCurrentWord(backtranslation: BackTranslation, currentWord: string) {
		return (
			backtranslation.displayText.toLowerCase() === currentWord.toLowerCase() ||
			backtranslation.normalizedText.toLowerCase() === currentWord.toLowerCase()
		);
	}
</script>

<div class="mdc-typography--subtitle1">
	{translation.normalizedTarget}
</div>
<div class="mdc-typography--body1 grayed backTranslation">
	{#each translation.backTranslations as backtranslation}
		{#if isCurrentWord(backtranslation, currentWord)}
			<span class:currentWord={isCurrentWord(backtranslation, currentWord)}>
				{backtranslation.displayText}
			</span>
		{:else}
			<Button
				color="secondary"
				on:click={() => changeCurrentWord(backtranslation.displayText)}
				style="min-width:0;text-transform:none;height:unset"
			>
				{backtranslation.displayText}
			</Button>
		{/if}
		{' '}
	{/each}
</div>
{#each examples.slice(0, limitExamples ? 2 : examples.length) as example}
	<ExampleSentence {example} />
{/each}
{#if examples.length > 2}
	<IconButton class="material-icons" on:click={toggleExampleLimit}>
		{limitExamples ? 'expand_more' : 'expand_less'}
	</IconButton>
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
