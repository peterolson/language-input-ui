<script lang="ts">
	import { viewContent } from '../../data/content';
	import { onMount } from 'svelte';
	import { finishReading, markUnknown, normalizeWord } from '../../data/knowledge';
	import { settings } from '../../data/settings';
	import type { ContentItem, ContentItemSummary } from '../../types/content.types';
	import type { Sentence, Token } from '../../types/parse.types';
	import LookupWord from '../dictionary/lookupWord.svelte';
	import Finished from './finished.svelte';
	import MediaView from './media/mediaView.svelte';
	import RatingDialog from './ratingDialog.svelte';
	import SidePanel from './sidePanel.svelte';
	import { addViewToHistory } from '../../data/history';
	import { fade } from 'svelte/transition';
	import { removeViewProgress } from '../../data/viewProgress';
	import PaginatedText from './paginatedText.svelte';

	export let content: ContentItem;
	const { media, lang } = content;
	const { userLanguage } = settings;

	let innerWidth = 640;
	let maxWidth = 640;
	let displayDictionaryAtTop = true;
	let mediaView: MediaView;
	let currentTime: number = 0;
	let lookedUpWords = new Set<string>();
	let newWordSet = new Set<string>();
	let isFinished = false;
	let container: HTMLDivElement;
	let recommendations: ContentItemSummary[] = [];

	onMount(() => {
		viewContent(content._id);
	});

	$: {
		maxWidth = Math.min(640, innerWidth);
	}

	let dialogOpen = false;
	function onFinish() {
		selectedToken = null;
		dialogOpen = true;
		addViewToHistory(content._id);
		finishReading(content);
		removeViewProgress(content._id);
	}

	function onDialogClose() {
		dialogOpen = false;
		isFinished = true;
	}

	function addNewWords(newWords: string[]) {
		newWordSet = new Set([...Array.from(newWordSet), ...newWords]);
	}

	function setLookedUpWords(words: Set<string>) {
		lookedUpWords = new Set(Array.from(words));
	}

	let selectedToken: Token | null = null;
	let selectedSentence: Sentence;
	let fullScreenLookup = false;

	function onLookup(item: { token: Token; sentence: Sentence; target: HTMLElement }) {
		selectedToken = item.token;
		selectedSentence = item.sentence;
		const target = item.target;
		const position = target.offsetTop / window.innerHeight;
		displayDictionaryAtTop = position >= 0.5;
		if (mediaView) {
			mediaView.controls.pause();
		}
		lookedUpWords.add(normalizeWord(selectedToken.text));
		lookedUpWords = new Set(lookedUpWords);
		markUnknown([selectedToken.text, selectedToken.lemma], content.lang);
	}

	function closeDictionary() {
		if (container.clientWidth >= 875) {
			return;
		}
		selectedToken = null;
	}

	function onRemoveLookedupWord(e: CustomEvent<Token>) {
		const token = e.detail;
		lookedUpWords.delete(normalizeWord(token.text));
		lookedUpWords = new Set(lookedUpWords);
	}
	function onAddLookedupWord(e: CustomEvent<Token>) {
		const token = e.detail;
		lookedUpWords.add(normalizeWord(token.text));
		lookedUpWords = new Set(lookedUpWords);
	}

	function onSeek(time: number) {
		if (mediaView) {
			mediaView.controls.clearListeners();
			mediaView.controls.seek(time);
			mediaView.controls.play();
		}
	}

	function onRecommend(e: CustomEvent<ContentItemSummary[]>) {
		recommendations = e.detail;
	}
</script>

<svelte:head>
	<title>{content.channel} - {content.title}</title>
</svelte:head>

<svelte:window bind:innerWidth />

<div class="container" bind:this={container}>
	<div class="leftPanel" on:click={closeDictionary}>
		<SidePanel {content} on:recommend={onRecommend} />
	</div>
	<div class="contentContainer" on:click={closeDictionary}>
		{#if isFinished}
			<div class="finished">
				<Finished
					{content}
					lookedUp={Array.from(lookedUpWords)}
					newWords={Array.from(newWordSet)}
				/>
			</div>
		{:else}
			<div style="width: {maxWidth};">
				<MediaView {media} bind:this={mediaView} bind:currentTime />
			</div>
			<PaginatedText
				{content}
				{currentTime}
				{lookedUpWords}
				{onSeek}
				{onLookup}
				{addNewWords}
				{onFinish}
				{mediaView}
				{setLookedUpWords}
			/>

			<RatingDialog
				open={dialogOpen}
				on:close={onDialogClose}
				id={content._id}
				{recommendations}
				channel={content.channel}
			/>
		{/if}
	</div>
	{#if !isFinished}
		<div
			class="dictionary mdc-elevation--z6"
			class:displayAtTop={displayDictionaryAtTop}
			class:hidden={!selectedToken}
			class:fullScreen={fullScreenLookup}
			in:fade
		>
			{#if selectedToken}
				{#key `${$userLanguage} ${selectedToken.text}`}
					<LookupWord
						token={selectedToken}
						sentence={selectedSentence}
						fromLang={lang}
						toLang={$userLanguage}
						fullScreen={fullScreenLookup}
						on:markKnown={onRemoveLookedupWord}
						on:markUnknown={onAddLookedupWord}
						on:close={() => {
							selectedToken = null;
							fullScreenLookup = false;
						}}
						on:fold={() => (fullScreenLookup = !fullScreenLookup)}
					/>
				{/key}
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	@use '@material/theme/color-palette';

	.container {
		display: flex;
		align-items: flex-start;
		height: 100%;
		overflow: auto;
	}
	.contentContainer {
		display: flex;
		flex: 2;
		flex-direction: column;
		height: 100%;
	}

	.dictionary {
		flex: 1;
		height: 100%;
		overflow: auto;
	}
	.hidden {
		visibility: hidden;
	}

	.leftPanel {
		flex: 1;
		height: 100%;
		overflow: auto;
		max-width: 320px;
	}

	@media (max-width: 1200px) {
		.leftPanel {
			flex: 0;
			display: none;
		}
	}

	@media (max-width: 875px) {
		.container {
			margin: auto;
		}

		.dictionary {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 40vh;
			background-color: var(--theme-background);
			border-top: 1px solid var(--border-color);
		}

		.displayAtTop {
			bottom: unset;
			top: 0;
			border-top: none;
			border-bottom: 1px solid var(--border-color);
		}

		.dictionary.fullScreen {
			top: 0;
			bottom: 0;
			height: unset;
		}
	}
</style>
