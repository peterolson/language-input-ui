<script lang="ts">
	import type { LanguageCode } from 'src/types/dictionary.types';
	import type { ParsedText, Token } from 'src/types/parse.types';
	import LookupWord from '../dictionary/lookupWord.svelte';
	import TextLine from './textLine.svelte';

	export let text: ParsedText;
	export let lang: LanguageCode;
	export let userLang: LanguageCode;

	let contentDiv: HTMLDivElement;
	let pages = 1;
	let currentPage = 1;

	$: {
		if (contentDiv) {
			pages = contentDiv.scrollWidth / contentDiv.clientWidth;
		}
	}

	function movePage(n: number) {
		if (1 <= currentPage + n && currentPage + n <= pages) {
			contentDiv.scrollTo({
				left: contentDiv.scrollLeft + contentDiv.clientWidth * n,
				behavior: 'smooth'
			});
			currentPage += n;
		}
	}

	let selectedToken: Token | null = null;

	function onLookup(e: CustomEvent<Token>) {
		selectedToken = e.detail;
	}
</script>

<div class="container">
	<div style="flex: 1" />
	<div class="contentContainer">
		<div class="content" bind:this={contentDiv}>
			{#each text.lines as line}
				<TextLine {line} {lang} {selectedToken} on:lookup={onLookup} />
			{/each}
		</div>
		<div>
			<button on:click={() => movePage(-1)}>Prev</button>
			Page {currentPage} of {pages}
			<button on:click={() => movePage(1)}>Next</button>
		</div>
	</div>
	<div class="dictionary">
		{#if selectedToken}
			{#key `${userLang} ${selectedToken.text}`}
				<LookupWord token={selectedToken} fromLang={lang} toLang={userLang} />
			{/key}
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: flex-start;
		height: 100%;
		overflow: auto;
	}
	.contentContainer {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.content {
		margin: 0 auto;
		height: 100%;
		overflow: hidden;
		width: 640px;
		column-width: 640px;
		column-gap: 0px;
	}
	.dictionary {
		flex: 1;
		height: 100%;
		overflow: auto;
	}
</style>
