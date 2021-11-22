<script lang="ts">
	import type { Media } from '../../../types/media.types';
	import Audio from './audio.svelte';
	import Video from './video.svelte';
	import Youtube from './youtube.svelte';

	export let media: Media;
</script>

{#if media.type === 'audio'}
	<Audio url={media.url} />
{:else if media.type === 'video'}
	<Video url={media.url} />
{:else if media.type === 'youtube'}
	<Youtube youtubeId={media.youtubeId} />
{/if}
