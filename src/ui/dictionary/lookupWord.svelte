<script lang="ts">
	import { lookupWord } from '../../data/dictionary';
	import { fade } from 'svelte/transition';
	import type { DictionaryLookup, LanguageCode } from '../../types/dictionary.types';
	import { onMount } from 'svelte';
	import WordTranslation from './wordTranslation.svelte';
	import type { Token } from '../../types/parse.types';
	import { text } from 'svelte/internal';

	export let token: Token;
	export let fromLang: LanguageCode;
	export let toLang: LanguageCode;

	let lookupResult: DictionaryLookup;

	onMount(async () => {
		lookupResult = await lookupWord(token.text, fromLang, toLang);
	});
</script>

<div class="container">
	<h1 class="mdc-typography--headline6">
		{token.text}
		{#if token.lemma.toLowerCase() !== token.text.toLowerCase()}
			({token.lemma})
		{/if}
	</h1>
	{#if lookupResult?.translations}
		<div class="results" in:fade|local>
			{#each lookupResult.translations as translation}
				<div class="result">
					<WordTranslation {translation} word={token.text} {fromLang} {toLang} />
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	h1 {
		margin: 0;
	}
	.result {
		padding: 0px 8px;
		width: 300px;
	}
	.container {
		padding: 8px;
	}
</style>
