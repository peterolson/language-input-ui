<script lang="ts">
	import type { Media, MediaControls } from '../../../types/media.types';
	import Audio from './audio.svelte';
	import Video from './video.svelte';
	import Youtube from './youtube.svelte';

	let loadListeners: (() => void)[] = [];

	export let currentTime: number = 0;
	export let media: Media;
	export const controls: MediaControls = {
		pause: () => {},
		seek: () => {},
		play: () => {},
		onLoad: (fn: () => void) => {
			fn();
			loadListeners.push(fn);
		}
	};

	function onLoad() {
		loadListeners.forEach((fn) => fn());
		loadListeners = [];
	}
</script>

{#if media.type === 'audio'}
	<Audio url={media.url} {controls} bind:currentTime on:load={onLoad} />
{:else if media.type === 'video'}
	<Video url={media.url} {controls} bind:currentTime on:load={onLoad} />
{:else if media.type === 'youtube'}
	<Youtube youtubeId={media.youtubeId} {controls} bind:currentTime on:load={onLoad} />
{/if}
