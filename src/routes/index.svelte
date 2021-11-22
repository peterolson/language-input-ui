<script lang="ts">
	import { LanguageCode } from '../types/dictionary.types';
	import { spanish1 } from '../data/playground';
	import Reader from '../ui/reader/reader.svelte';
	import { settings } from '../data/settings';
	import type { Media } from '../types/media.types';

	const { userLanguage } = settings;
	const media: Media = {
		type: 'video',
		url: 'https://data.dong-chinese.com/partner/coolpanda/107.mp4'
	};
</script>

<div class="container">
	<Reader text={spanish1} lang={LanguageCode.Spanish} userLang={$userLanguage} {media} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}
</style>
