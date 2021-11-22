<script lang="ts">
	import { onMount } from 'svelte';
	import type { MediaControls } from '../../../types/media.types';
	import YouTubePlayer from 'yt-player';

	export let youtubeId: string;
	export let controls: MediaControls;

	let playerContainer: HTMLDivElement;
	let player: YouTubePlayer;
	onMount(() => {
		player = new YouTubePlayer(playerContainer);
		player.load(youtubeId);
		controls.pause = () => player.pause();
	});
</script>

<div class="container">
	<div bind:this={playerContainer} class="playerContainer" />
</div>

<style>
	.container {
		aspect-ratio: 16/9;
		position: relative;
		max-height: 40vh;
		margin: auto;
	}
	.playerContainer {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}
</style>
