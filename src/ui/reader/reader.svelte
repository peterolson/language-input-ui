<script lang="ts">
	import IconButton from '@smui/icon-button/IconButton.svelte';
	import type { LanguageCode } from '../../types/dictionary.types';
	import type { Media } from '../../types/media.types';
	import type { ParsedText, Token } from '../../types/parse.types';
	import LookupWord from '../dictionary/lookupWord.svelte';
	import MediaView from './media/mediaView.svelte';
	import TextLine from './textLine.svelte';

	export let text: ParsedText;
	export let lang: LanguageCode;
	export let userLang: LanguageCode;
	export let media: Media;

	let contentDiv: HTMLDivElement;
	let pages = 10;
	let currentPage = 1;
	let innerWidth = 640;
	let maxWidth = 640;
	let progressCurrentPercent = 0;
	let displayDictionaryAtTop = true;
	let mediaView: MediaView;

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
		if (1 <= currentPage + n && currentPage + n <= pages) {
			contentDiv.scrollTo({
				left: contentDiv.clientWidth * (currentPage - 1 + n),
				behavior: 'smooth'
			});
			currentPage += n;
			updateProgress();
		}
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
	}
</script>

<svelte:window bind:innerWidth />

<div
	class="container"
	on:touchmove={onTouchMove}
	on:mousemove={onMouseMove}
	on:touchend={onTouchEnd}
	on:mouseup={onMouseUp}
>
	<div class="leftPanel" />
	<div class="contentContainer">
		<div class="media">
			<MediaView {media} bind:this={mediaView} />
		</div>
		<div
			class="content"
			bind:this={contentDiv}
			on:touchstart={onTouchStart}
			on:mousedown={onMouseDown}
		>
			{#each text.lines as line}
				<TextLine {line} {selectedToken} on:lookup={onLookup} />
			{/each}
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
	</div>
	<div
		class="dictionary mdc-elevation--z6"
		class:displayAtTop={displayDictionaryAtTop}
		class:hidden={!selectedToken}
		class:fullScreen={fullScreenLookup}
	>
		{#if selectedToken}
			{#key `${userLang} ${selectedToken.text}`}
				<LookupWord
					token={selectedToken}
					fromLang={lang}
					toLang={userLang}
					fullScreen={fullScreenLookup}
					on:close={() => {
						selectedToken = null;
						fullScreenLookup = false;
					}}
					on:fold={() => (fullScreenLookup = !fullScreenLookup)}
				/>
			{/key}
		{/if}
	</div>
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
	}

	@media screen and (max-width: 1200px) {
		.leftPanel {
			flex: 0;
			display: none;
		}
	}

	@media screen and (max-width: 875px) {
		.dictionary {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 180px;
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
