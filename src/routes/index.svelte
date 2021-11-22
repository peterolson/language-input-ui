<script lang="ts">
	import { LanguageCode } from '../types/dictionary.types';
	import { parsedText } from '../data/playground';
	import Reader from '../ui/reader/reader.svelte';
	import { settings } from '../data/settings';
	import type { Media } from '../types/media.types';

	const { userLanguage } = settings;
	const media: Media = {
		type: 'youtube',
		youtubeId: 'GdHfcFXKWlY'
	};
</script>

<div class="container">
	<Reader text={parsedText} lang={LanguageCode.Russian} userLang={$userLanguage} {media} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}
</style>
