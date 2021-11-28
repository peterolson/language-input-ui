<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import YouTubePlayer from 'yt-player';
	import CircularProgress from '@smui/circular-progress';
	import { endpoint } from '../../data/endpoint';
	import type { LanguageCode } from '../../types/dictionary.types';
	import YoutubeSubtitleView from './youtubeSubtitleView.svelte';
	import { t } from '../../i18n/i18n';

	export let youtubeId: string;
	let playerContainer: HTMLDivElement;
	let player: YouTubePlayer;
	let isLoading: boolean = false;
	let subtitleData: null | {
		duration: number;
		subtitles: Record<LanguageCode, { url: string; ext: string }[]>;
	} = null;

	onMount(() => {
		player = new YouTubePlayer(playerContainer);
		player.load(youtubeId);
		let hasLoaded = false;
		player.on('unstarted', async () => {
			if (hasLoaded) return;
			getSubtitleData();
			hasLoaded = true;
		});
	});

	onDestroy(() => {
		if (player) {
			player.destroy();
		}
	});

	let hasError = false;
	async function getSubtitleData() {
		isLoading = true;
		subtitleData = await fetch(`${endpoint}/content/yt-subtitles?id=${youtubeId}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				hasError = true;
				return null;
			})
			.catch(() => {
				hasError = true;
				return null;
			});
		if (!subtitleData?.subtitles || !subtitleData.duration) {
			hasError = true;
		}
		isLoading = false;
	}
</script>

<div class="container">
	<div bind:this={playerContainer} class="playerContainer" />

	{#if isLoading}
		<div class="mdc-typography--body2 loading">
			<CircularProgress style="height: 32px; width: 32px; padding-right: 16px;" indeterminate />
			<div>{$t('add.loadingSubtitles')}</div>
		</div>
	{/if}
	{#if hasError}
		<div class="mdc-typography--body1 loading">
			<div>{$t('add.importError')}</div>
		</div>
	{/if}
	{#if subtitleData && !hasError}
		<YoutubeSubtitleView {...subtitleData} {youtubeId} />
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		overflow: auto;
		width: 100%;
	}

	.playerContainer {
		width: 320px;
		height: 180px;
	}

	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
