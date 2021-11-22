<script lang="ts">
	import type { Media, MediaControls } from '../../../types/media.types';
	import Audio from './audio.svelte';
	import Video from './video.svelte';
	import Youtube from './youtube.svelte';

	export let media: Media;
	export const controls: MediaControls = {
		pause: () => {}
	};
</script>

{#if media.type === 'audio'}
	<Audio url={media.url} {controls} />
{:else if media.type === 'video'}
	<Video url={media.url} {controls} />
{:else if media.type === 'youtube'}
	<Youtube youtubeId={media.youtubeId} {controls} />
{/if}
