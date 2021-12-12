<script lang="ts">
	import { browser } from '$app/env';
	import IconButton from '@smui/icon-button';

	import { onDestroy, onMount } from 'svelte';
	import type { ContentItem } from '../../types/content.types';
	import type { Sentence, TextLine as TextLineType, Token } from '../../types/parse.types';
	import FeedbackButton from './feedbackButton.svelte';
	import { smoothScroll } from './smoothscroll';
	import TextLine from './textLine.svelte';

	import { knowledgeStore, markKnown, normalizeWord } from '../../data/knowledge';
	import { addViewProgress, ViewProgressItem, viewProgressStore } from '../../data/viewProgress';
	import type MediaView from './media/mediaView.svelte';

	export let content: ContentItem;
	export let currentTime: number;
	export let lookedUpWords: Set<string>;
	export let onSeek: (time: number) => void;
	export let onLookup: (item: { token: Token; sentence: Sentence; target: HTMLElement }) => void;
	export let addNewWords: (words: string[]) => void;
	export let onFinish: () => void;
	export let mediaView: MediaView;
	export let setLookedUpWords: (words: Set<string>) => void;

	const { timings } = content;
	const { lines, totalTokens } = addTokenIndexes(content.parsedText.lines);
	const tokenLimit = 100;
	let containerDiv: HTMLDivElement;
	let topTokenIndex = 0;
	let completedTokenIndex = 0;
	let currentVisibleTokenCount = 0;

	function addTokenIndexes(lines: TextLineType[]) {
		let index = 0;
		for (const line of lines) {
			line.startTokenIndex = index;
			for (const sentence of line.sentences) {
				for (const token of sentence.tokens) {
					token.index = index;
					index++;
				}
			}
			line.endTokenIndex = index;
		}
		return { lines, totalTokens: index };
	}

	if (browser) {
		const onResize = () => {
			snapToCurrentPage(true);
			setVisibleTokenCount();
		};

		onMount(() => {
			snapToCurrentPage(true);
			setVisibleTokenCount();
			window.addEventListener('resize', onResize);
			setTimeout(() => {
				restoreViewProgress($viewProgressStore[content._id]);
			}, 250);
		});
		onDestroy(() => {
			window.removeEventListener('resize', onResize);
		});
	}

	function setVisibleTokenCount() {
		setTimeout(() => {
			currentVisibleTokenCount = getVisibleTokens().length;
		}, 10);
	}

	function getVisibleTokens() {
		if (!containerDiv) return [];
		const left = containerDiv.offsetLeft + containerDiv.clientWidth;
		const right = left + containerDiv.clientWidth;
		const tokens = Array.from(
			containerDiv.querySelectorAll('.current-page span.token')
		) as HTMLSpanElement[];
		return tokens.filter((el) => left <= el.offsetLeft && el.offsetLeft + el.clientWidth <= right);
	}

	function snapToCurrentPage(immediate = false) {
		if (immediate) {
			containerDiv.scrollLeft = containerDiv.clientWidth;
			return;
		}
		smoothScroll(containerDiv, containerDiv.clientWidth);
	}

	async function moveLeft() {
		if (topTokenIndex === 0) {
			snapToCurrentPage();
			return;
		}
		await smoothScroll(containerDiv, 0);
		const tokens = Array.from(
			containerDiv.querySelectorAll('.previous-page span.token')
		) as HTMLSpanElement[];
		const left = containerDiv.offsetLeft;
		const right = left + containerDiv.clientWidth;
		const visibleTokens = tokens.filter(
			(el) => left <= el.offsetLeft && el.offsetLeft + el.clientWidth <= right
		);
		const tokenWithSmallestIndex = visibleTokens.reduce(
			(prev, curr) => (Number(prev.dataset.index) < Number(curr.dataset.index) ? prev : curr),
			tokens[0]
		);
		topTokenIndex = Number(tokenWithSmallestIndex.dataset.index);
		snapToCurrentPage(true);
		setVisibleTokenCount();
	}

	async function moveRight() {
		if (topTokenIndex + currentVisibleTokenCount >= totalTokens) {
			snapToCurrentPage();
			return;
		}
		const visibleTokens = getVisibleTokens();
		const lastVisibleToken = visibleTokens[visibleTokens.length - 1];
		const lastTokenIndex = +(lastVisibleToken.dataset.index as string);
		const width = containerDiv.clientWidth;
		await smoothScroll(containerDiv, width + width);
		if (topTokenIndex >= completedTokenIndex) {
			markKnownWords(visibleTokens);
			saveViewProgress();
		}
		topTokenIndex = lastTokenIndex + 1;
		completedTokenIndex = Math.max(completedTokenIndex, lastTokenIndex);
		snapToCurrentPage(true);
		setVisibleTokenCount();
	}

	function markKnownWords(visibleTokens: HTMLSpanElement[]) {
		const wordSet = new Set<string>();
		visibleTokens.forEach((span) => {
			if (!span.classList.contains('word')) return;
			const lemma = span.dataset.lemma;
			const word = span.textContent;
			if (lemma) wordSet.add(normalizeWord(lemma));
			if (word) wordSet.add(normalizeWord(word));
		});
		const words = Array.from(wordSet).filter((word) => !lookedUpWords.has(word));
		const newWords = markKnown(words, content.lang);
		addNewWords(newWords);
	}

	let isSwiping = false;
	let startX = 0;
	let startScrollLeft = 0;
	let lastX = 0;

	function startSwipe(x: number) {
		isSwiping = true;
		startX = x;
		lastX = x;
		startScrollLeft = containerDiv.scrollLeft;
	}
	function swipeMove(x: number) {
		if (!isSwiping) return;
		lastX = x;
		containerDiv.scrollTo(startScrollLeft - (x - startX), 0);
	}
	function swipeEnd() {
		if (!isSwiping) return;
		isSwiping = false;
		if (Math.abs(lastX - startX) > 100) {
			if (lastX > startX) {
				moveLeft();
			} else {
				moveRight();
			}
		} else {
			snapToCurrentPage();
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
		swipeEnd();
	}
	function onMouseUp(e: MouseEvent) {
		swipeEnd();
	}

	function finishLastPage() {
		const visibleTokens = getVisibleTokens();
		markKnownWords(visibleTokens);
		onFinish();
	}

	function saveViewProgress() {
		addViewProgress(content._id, {
			currentTime: Math.max(0, currentTime - 10),
			lookedUpWords: Array.from(lookedUpWords),
			topTokenIndex,
			completedTokenIndex
		});
	}

	function restoreViewProgress(progress: ViewProgressItem) {
		if (!progress || !containerDiv) return;
		setLookedUpWords(lookedUpWords);
		topTokenIndex = progress.topTokenIndex;
		completedTokenIndex = progress.completedTokenIndex;
		snapToCurrentPage(true);
		const tokenSpan = Array.from(containerDiv.querySelectorAll('span.word'))[
			progress.topTokenIndex
		] as HTMLSpanElement;

		mediaView.controls.onLoad(() => {
			const topLineButton = tokenSpan?.parentNode?.parentNode?.querySelector('button');
			if (topLineButton) topLineButton.click();
			else {
				mediaView.controls.seek(progress.currentTime);
				mediaView.controls.play();
			}
		});
	}
</script>

<div
	class="container"
	bind:this={containerDiv}
	on:touchmove={onTouchMove}
	on:mousemove={onMouseMove}
	on:touchend={onTouchEnd}
	on:mouseup={onMouseUp}
	on:mouseleave={onMouseUp}
	on:touchstart={onTouchStart}
	on:mousedown={onMouseDown}
>
	<div class="previous-page">
		{#each lines
			.map((line, i) => ({ line, i }))
			.filter((x) => (x.line.startTokenIndex || 0) < topTokenIndex)
			.slice(-tokenLimit)
			.reverse() as { line, i }}
			{#key line.startTokenIndex}
				<TextLine
					{line}
					{currentTime}
					lang={content.lang}
					knowledge={$knowledgeStore}
					{lookedUpWords}
					timing={timings[i]}
					nextTiming={timings[i + 1]}
					{onSeek}
					{onLookup}
				/>
			{/key}
		{/each}
	</div>
	<div class="current-page">
		{#each lines
			.map((line, i) => ({ line, i }))
			.filter((x) => (x.line.endTokenIndex || 0) > topTokenIndex)
			.slice(0, tokenLimit) as { line, i }}
			{#key line.startTokenIndex}
				<TextLine
					{line}
					{currentTime}
					lang={content.lang}
					knowledge={$knowledgeStore}
					{lookedUpWords}
					timing={timings[i]}
					nextTiming={timings[i + 1]}
					{onSeek}
					{onLookup}
				/>
			{/key}
		{/each}
	</div>
</div>
<div class="progressContainer">
	<FeedbackButton {content} />
	<div class:hidden={topTokenIndex === 0}>
		<IconButton class="material-icons" on:click={moveLeft}>navigate_before</IconButton>
	</div>
	<div class="progressBar">
		<div
			class="progressCurrent"
			style={`width:${
				((completedTokenIndex +
					(completedTokenIndex <= topTokenIndex ? currentVisibleTokenCount / 2 : 0)) *
					100) /
				totalTokens
			}%`}
		/>
		<div
			class="progressCurrentPosition"
			style={`left:${(topTokenIndex * 100) / totalTokens}%;width:${
				(currentVisibleTokenCount * 100) / totalTokens
			}%;`}
			class:leftEdge={topTokenIndex === 0}
			class:rightEdge={topTokenIndex + currentVisibleTokenCount >= totalTokens}
		/>
	</div>
	{#if topTokenIndex + currentVisibleTokenCount >= totalTokens}
		<IconButton class="material-icons" on:click={finishLastPage}>check_circle</IconButton>
	{:else}
		<IconButton class="material-icons" on:click={moveRight}>navigate_next</IconButton>
	{/if}
</div>

<style lang="scss">
	@use '@material/theme/color-palette';
	.container {
		margin: auto;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		overflow: hidden;
		max-width: 640px;
	}

	.current-page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column wrap;
		flex-shrink: 0;
	}

	.previous-page {
		height: 100%;
		width: 100%;
		display: flex;
		flex-flow: column-reverse wrap;
		direction: rtl;
		flex-shrink: 0;
		justify-content: flex-end;
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
		position: relative;
	}
	.progressCurrent {
		width: 0;
		height: 100%;
		border-radius: inherit;
		background-color: color-palette.$green-500;
		transition: width 0.2s linear;
	}
	.progressCurrentPosition {
		position: absolute;
		width: 0;
		top: 0;
		bottom: 0;
		background-color: color-palette.$yellow-700;
		transition: width 0.2s linear;
		transition: left 0.2s linear;
	}
	.leftEdge {
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}
	.rightEdge {
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	}

	.hidden {
		visibility: hidden;
	}
</style>
