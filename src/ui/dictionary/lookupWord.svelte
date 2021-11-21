<script lang="ts">
	import { lookupWord } from '../../data/dictionary';
	import { fade } from 'svelte/transition';
	import type { DictionaryLookup, LanguageCode } from '../../types/dictionary.types';
	import { onMount } from 'svelte';
	import WordTranslation from './wordTranslation.svelte';

	export let word: string;
	export let fromLang: LanguageCode;
	export let toLang: LanguageCode;

	let lookupResult: DictionaryLookup;

	onMount(async () => {
		lookupResult = await lookupWord(word, fromLang, toLang);
	});
</script>

<p class="mdc-typography--body1">
	{fromLang}
	{toLang}
</p>
<h1 class="mdc-typography--headline5">{word}</h1>
{#if lookupResult?.translations}
	<div class="results" in:fade|local>
		{#each lookupResult.translations as translation}
			<div class="result">
				<WordTranslation {translation} {word} {fromLang} {toLang} />
			</div>
		{/each}
	</div>
{/if}

<style>
	.results {
		display: flex;
	}
	.result {
		padding: 0px 8px;
	}
</style>
