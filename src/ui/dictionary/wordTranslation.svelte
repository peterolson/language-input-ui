<script lang="ts">
	import IconButton from '@smui/icon-button';
	import { getExamples } from '../../data/dictionary';

	import type {
		DictionaryExample,
		DictionaryTranslation,
		LanguageCode
	} from 'src/types/dictionary.types';
	import { onMount } from 'svelte';
	import ExampleSentence from './exampleSentence.svelte';

	export let word: string;
	export let translation: DictionaryTranslation;
	export let fromLang: LanguageCode;
	export let toLang: LanguageCode;

	let examples: DictionaryExample[] = [];
	let limitExamples = true;

	onMount(async () => {
		examples = await getExamples(word, translation.normalizedTarget, fromLang, toLang);
		console.log(examples);
	});

	function toggleExampleLimit() {
		limitExamples = !limitExamples;
	}
</script>

<div class="mdc-typography--subtitle1">
	{translation.normalizedTarget}
</div>
<div class="mdc-typography--body1 grayed backTranslation">
	{#each translation.backTranslations as backtranslation}
		<span
			class:currentWord={backtranslation.displayText === word ||
				backtranslation.normalizedText === word}
		>
			{backtranslation.displayText}
		</span>{' '}
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
