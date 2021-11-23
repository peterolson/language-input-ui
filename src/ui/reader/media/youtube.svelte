<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { MediaControls } from '../../../types/media.types';
	import YouTubePlayer from 'yt-player';

	export let youtubeId: string;
	export let controls: MediaControls;
	export let currentTime: number = 0;

	let playerContainer: HTMLDivElement;
	let player: YouTubePlayer;

	let interval: number;

	onMount(() => {
		player = new YouTubePlayer(playerContainer);
		player.load(youtubeId);
		player.on('timeupdate', (time) => {
			currentTime = time;
		});
		interval = setInterval(() => {
			currentTime = player.getCurrentTime();
		}, 197) as any;
		controls.pause = () => player.pause();
		controls.seek = (time: number) => player.seek(time);
		controls.play = () => player.play();
	});

	onDestroy(() => {
		clearInterval(interval);
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
