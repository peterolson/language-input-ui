<script lang="ts">
	import { onMount } from 'svelte';

	import YouTubePlayer from 'yt-player';
	// const player = new YouTubePlayer();
	// console.log(YouTubePlayer);
	export let youtubeId: string;
	let playerContainer: HTMLDivElement;
	let player: YouTubePlayer;
	onMount(() => {
		player = new YouTubePlayer(playerContainer);
		player.load(youtubeId);
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
