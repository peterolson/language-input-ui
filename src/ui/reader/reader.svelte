<script lang="ts">
	import IconButton from '@smui/icon-button';
	import { viewContent } from '../../data/content';
	import { onMount } from 'svelte';
	import {
		finishReading,
		knowledgeStore,
		markKnown,
		markUnknown,
		normalizeWord
	} from '../../data/knowledge';
	import { settings } from '../../data/settings';
	import type { ContentItem } from '../../types/content.types';
	import type { Token } from '../../types/parse.types';
	import LookupWord from '../dictionary/lookupWord.svelte';
	import Finished from './finished.svelte';
	import MediaView from './media/mediaView.svelte';
	import RatingDialog from './ratingDialog.svelte';
	import SidePanel from './sidePanel.svelte';
	import TextLine from './textLine.svelte';
	import { addViewToHistory } from '../../data/history';
	import { fade } from 'svelte/transition';
	import {
		addViewProgress,
		removeViewProgress,
		ViewProgressItem,
		viewProgressStore
	} from '../../data/viewProgress';

	export let content: ContentItem;
	const { media, parsedText, lang, timings } = content;
	const { userLanguage } = settings;

	let contentDiv: HTMLDivElement;
	let pages = 10;
	let currentPage = 1;
	let innerWidth = 640;
	let maxWidth = 640;
	let progressCurrentPercent = 0;
	let displayDictionaryAtTop = true;
	let mediaView: MediaView;
	let currentTime: number = 0;
	let lookedUpWords = new Set<string>();
	let newWordSet = new Set<string>();
	let isFinished = false;
	let container: HTMLDivElement;

	$: {
		maxWidth = Math.min(640, innerWidth);
		if (contentDiv) {
			contentDiv.style.width = `${maxWidth}px`;
			contentDiv.style.columnWidth = `${maxWidth}px`;
			pages = Math.ceil(contentDiv.scrollWidth / maxWidth);
			snapToNearestPage();
			updateProgress();
		}
	}

	onMount(() => {
		viewContent(content._id);
		setTimeout(() => {
			restoreViewProgress($viewProgressStore[content._id]);
		}, 250);
	});

	let isSwiping = false;
	let startX = 0;
	let startScrollLeft = 0;
	let lastX = 0;

	function startSwipe(x: number) {
		if (!contentDiv) return;
		isSwiping = true;
		startX = x;
		lastX = x;
		startScrollLeft = contentDiv.scrollLeft;
	}
	function swipeMove(x: number) {
		if (!contentDiv) return;
		if (!isSwiping) return;
		lastX = x;
		contentDiv.scrollTo(startScrollLeft - (x - startX), 0);
	}
	function swipeEnd() {
		if (!isSwiping) return;
		isSwiping = false;
		if (Math.abs(lastX - startX) > 100) {
			movePage(lastX > startX ? -1 : 1);
		} else {
			snapToNearestPage('smooth');
		}
	}

	function onTouchStart(e: TouchEvent) {
		startSwipe(e.touches[0].clientX);
	}
	function onMouseDown(e: MouseEvent) {
		startSwipe(e.clientX);
		e.preventDefault();
	}
	function onTouchMove(e: TouchEvent) {
		swipeMove(e.touches[0].clientX);
	}
	function onMouseMove(e: MouseEvent) {
		swipeMove(e.clientX);
	}
	function onTouchEnd(e: TouchEvent) {
		const target = e.target as HTMLElement;
		if (['span', 'i', 'button'].includes(target.tagName.toLowerCase())) return; // prevent swiping on button taps
		swipeEnd();
	}
	function onMouseUp(e: MouseEvent) {
		swipeEnd();
	}

	function snapToNearestPage(behavior: ScrollBehavior = 'auto') {
		if (contentDiv) {
			const { scrollLeft, scrollWidth } = contentDiv;
			const interval = scrollWidth / pages;
			const page = Math.round(scrollLeft / interval);
			contentDiv.scrollTo({
				left: page * interval,
				behavior
			});
		}
	}

	function movePage(n: number) {
		if (currentPage + n > pages) {
			onFinish();
			return;
		}
		if (1 <= currentPage + n) {
			if (n > 0) markWordsOnCurrentPage();
			saveViewProgress();
			contentDiv.scrollTo({
				left: contentDiv.clientWidth * (currentPage - 1 + n),
				behavior: 'smooth'
			});
			currentPage += n;
			updateProgress();
		}
	}

	let dialogOpen = false;
	function onFinish() {
		markWordsOnCurrentPage();
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

	function getVisibleTokens(): HTMLSpanElement[] {
		if (!contentDiv) return [];
		const left = contentDiv.offsetLeft + contentDiv.scrollLeft;
		const right = left + contentDiv.clientWidth;
		return Array.from(contentDiv.querySelectorAll('span.word')).filter((el) => {
			const span = el as HTMLSpanElement;
			return span.offsetLeft >= left && span.offsetLeft + span.offsetWidth <= right;
		}) as HTMLSpanElement[];
	}

	function markWordsOnCurrentPage() {
		if (!contentDiv) return;
		const visibleTokens = getVisibleTokens();
		const wordSet = new Set<string>();
		visibleTokens.forEach((span) => {
			const lemma = span.dataset.lemma;
			const word = span.textContent;
			if (lemma) wordSet.add(normalizeWord(lemma));
			if (word) wordSet.add(normalizeWord(word));
		});
		const words = Array.from(wordSet).filter((word) => !lookedUpWords.has(word));
		const newWords = markKnown(words, content.lang);
		newWordSet = new Set([...Array.from(newWordSet), ...newWords]);
	}

	function updateProgress() {
		if (!contentDiv) return;
		progressCurrentPercent = Math.round((currentPage * 100) / pages);
	}

	let selectedToken: Token | null = null;
	let fullScreenLookup = false;

	function onLookup(e: CustomEvent<{ token: Token; target: HTMLElement }>) {
		selectedToken = e.detail.token;
		const target = e.detail.target;
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

	function onSeek(e: CustomEvent<{ time: number }>) {
		if (mediaView) {
			mediaView.controls.clearListeners();
			mediaView.controls.seek(e.detail.time);
			mediaView.controls.play();
		}
	}

	function saveViewProgress() {
		const firstVisibleToken = getVisibleTokens()[0];
		const index = Array.from(contentDiv.querySelectorAll('span.word')).indexOf(firstVisibleToken);
		addViewProgress(content._id, {
			currentTime: Math.max(0, currentTime - 10),
			lookedUpWords: Array.from(lookedUpWords),
			topTokenIndex: index
		});
	}

	function restoreViewProgress(progress: ViewProgressItem) {
		if (!progress) return;

		lookedUpWords = new Set(progress.lookedUpWords);
		const tokenSpan = Array.from(contentDiv.querySelectorAll('span.word'))[
			progress.topTokenIndex
		] as HTMLSpanElement;
		const { scrollWidth } = contentDiv;
		const tokenLeft = tokenSpan.offsetLeft - contentDiv.offsetLeft;
		const interval = scrollWidth / pages;
		let left = 0;
		let page = 1;
		while (left + interval < tokenLeft) {
			left += interval;
			page++;
		}
		contentDiv.scrollLeft = left;
		mediaView.controls.onLoad(() => {
			const topLineButton = tokenSpan?.parentNode?.parentNode?.querySelector('button');
			if (topLineButton) topLineButton.click();
			else {
				mediaView.controls.seek(progress.currentTime);
				mediaView.controls.play();
			}
		});
		currentPage = page;
		updateProgress();
	}
</script>

<svelte:head>
	<title>{content.channel} - {content.title}</title>
</svelte:head>

<svelte:window bind:innerWidth />

<div
	class="container"
	on:touchmove={onTouchMove}
	on:mousemove={onMouseMove}
	on:touchend={onTouchEnd}
	on:mouseup={onMouseUp}
	bind:this={container}
>
	<div class="leftPanel" on:click={closeDictionary}>
		<SidePanel {content} />
	</div>
	<div class="contentContainer" on:click={closeDictionary}>
		{#if isFinished}
			<div class="content finished" bind:this={contentDiv}>
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
			<div
				class="content"
				bind:this={contentDiv}
				on:touchstart={onTouchStart}
				on:mousedown={onMouseDown}
			>
				<div style="padding:8px;">
					{#each parsedText.lines as line, i}
						<TextLine
							{line}
							on:lookup={onLookup}
							{currentTime}
							timing={timings[i]}
							nextTiming={timings[i + 1]}
							knowledge={$knowledgeStore}
							lang={content.lang}
							{lookedUpWords}
							on:seek={onSeek}
						/>
					{/each}
				</div>
			</div>
			<div class="progressContainer">
				<div class:hidden={currentPage === 1}>
					<IconButton class="material-icons" on:click={() => movePage(-1)}>
						navigate_before
					</IconButton>
				</div>
				<div class="progressBar">
					<div class="progressCurrent" style={`width:${progressCurrentPercent}%`} />
				</div>
				<IconButton class="material-icons" on:click={() => movePage(1)}>
					{currentPage === pages ? 'check_circle' : 'navigate_next'}
				</IconButton>
			</div>
			<RatingDialog open={dialogOpen} on:close={onDialogClose} id={content._id} />
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
	.content {
		margin: 0 auto;
		height: 100%;
		overflow: hidden;
		width: 100vw;
		max-width: 640px;
		column-width: 100vw;
		column-gap: 0px;
	}
	.content.finished {
		column-width: unset !important;
		column-gap: unset;
		width: unset !important;
		max-width: unset;
		overflow: auto;
	}

	.dictionary {
		flex: 1;
		height: 100%;
		overflow: auto;
	}
	.progressContainer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid var(--border-color);
	}
	.progressBar {
		flex-grow: 1;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		height: 16px;
	}
	.progressCurrent {
		width: 0;
		height: 100%;
		border-radius: inherit;
		background-color: color-palette.$green-500;
		transition: width 0.2s ease-in-out;
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
