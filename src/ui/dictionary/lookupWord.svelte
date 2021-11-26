<script lang="ts">
	import { lookupWord } from '../../data/dictionary';
	import { fade } from 'svelte/transition';
	import type { DictionaryLookup, LanguageCode } from '../../types/dictionary.types';
	import { onMount } from 'svelte';
	import WordTranslation from './wordTranslation.svelte';
	import type { Token } from '../../types/parse.types';
	import IconButton from '@smui/icon-button';
	import { createEventDispatcher } from 'svelte';
	import { settings } from '../../data/settings';
	import Switch from '@smui/switch';
	import { isKnown, knowledgeStore, markKnown, markUnknown } from '../../data/knowledge';
	import type { Knowledge } from '../../types/knowledge.types';
	import { t } from '../../i18n/i18n';

	const dispatch = createEventDispatcher();
	const { isTraditional } = settings;

	export let token: Token;
	export let fromLang: LanguageCode;
	export let toLang: LanguageCode;
	export let fullScreen: boolean;

	let lookupResult: DictionaryLookup;

	onMount(async () => {
		lookupResult = await lookupWord(token.text, fromLang, toLang);
	});

	function onClose() {
		dispatch('close');
	}
	function onFold() {
		dispatch('fold');
	}

	function isWordKnown(
		knowledge: Knowledge,
		lang: LanguageCode,
		token: Token,
		isTraditional: boolean
	) {
		if (!token?.isWord) return false;
		const text = isTraditional && token.tradText ? token.tradText : token.text;
		return isKnown(knowledge, lang, text);
	}

	let knowsWord = isWordKnown($knowledgeStore, fromLang, token, $isTraditional);
	$: {
		knowsWord = isWordKnown($knowledgeStore, fromLang, token, $isTraditional);
	}

	function toggleWordKnown(lang: LanguageCode, token: Token, isTraditional: boolean) {
		const text = isTraditional && token.tradText ? token.tradText : token.text;
		if (knowsWord) {
			markUnknown([text], lang);
			dispatch('markUnknown', token);
		} else {
			markKnown([text], lang);
			dispatch('markKnown', token);
		}
	}
</script>

<div class="container" in:fade out:fade>
	<div class="header">
		<h1 class="mdc-typography--headline6">
			{$isTraditional && token.tradText ? token.tradText : token.text}
			{#if token.lemma && token.lemma.toLowerCase() !== token.text.toLowerCase()}
				({token.lemma})
			{/if}
			{#if token.tradText && token.tradText !== token.text}
				({isTraditional ? token.text : token.tradText})
			{/if}
		</h1>
		<div class="buttons">
			<span
				class="fold"
				class:hidden={lookupResult?.translations?.length < 2 &&
					!lookupResult?.translations?.[0].backTranslations?.length}
			>
				<IconButton class="material-icons" on:click={onFold}>
					{fullScreen ? 'unfold_less' : 'unfold_more'}
				</IconButton>
			</span>
			<IconButton class="material-icons" on:click={onClose}>close</IconButton>
		</div>
	</div>
	<div class="results">
		{#if token.transliterations}
			<div class="space-between mdc-typography--body2">
				{#each token.transliterations as transliteration}
					<div>{transliteration}</div>
				{/each}
			</div>
		{/if}
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="space-between mdc-typography--caption">
			<span style="opacity:0.7">
				{knowsWord ? $t('knowledge.knownWord') : $t('knowledge.unknownWord')}
			</span>
			<div>
				<Switch
					checked={knowsWord}
					on:click={() => toggleWordKnown(fromLang, token, $isTraditional)}
				/>
			</div>
		</label>
		{#if lookupResult?.translations}
			{#each lookupResult.translations as translation, i}
				<div class="result" in:fade>
					<WordTranslation
						{translation}
						word={token.text}
						{fromLang}
						{toLang}
						loadExamples={i === 0}
					/>
				</div>
			{/each}
		{/if}
		<div class="mdc-typography--caption result">
			{token.pos}
			{token.tag === token.pos ? '' : token.tag}
			{#each token.morph.split('|') as morph}
				<div>{morph}</div>
			{/each}
		</div>
	</div>
</div>

<style>
	h1 {
		margin: 0;
	}

	.space-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px;
	}

	.results {
		flex: 1;
		overflow: auto;
	}

	.result {
		padding: 0px 8px;
	}
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 8px;
		border-bottom: 1px solid var(--border-color);
	}

	.buttons {
		width: 116px;
		flex-shrink: 0;
	}

	.hidden {
		visibility: hidden;
	}

	.fold {
		visibility: hidden;
	}
	@media (max-width: 875px) {
		.fold {
			visibility: visible;
		}
		.fold.hidden {
			visibility: hidden;
		}
	}
</style>
