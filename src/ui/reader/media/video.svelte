<script lang="ts">
	import { onMount } from 'svelte';

	import type { MediaControls } from '../../../types/media.types';
	export let url: string;
	export let controls: MediaControls;
	export let currentTime: number = 0;

	let video: HTMLVideoElement;

	onMount(() => {
		controls.pause = () => {
			video.pause();
		};
		controls.seek = (time: number) => {
			video.currentTime = time;
		};
		controls.play = () => {
			video.play();
		};
	});
</script>

<div class="container">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video controls bind:this={video} bind:currentTime>
		<source src={url} />
	</video>
</div>

<style>
	.container {
		height: 40vh;
		text-align: center;
	}

	video {
		height: 100%;
	}
</style>
