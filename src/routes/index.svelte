<script lang="ts">
	import { LanguageCode } from '../types/dictionary.types';
	import { spanish1 } from '../data/playground';
	import Reader from '../ui/reader/reader.svelte';
	import { settings } from '../data/settings';

	const { userLanguage } = settings;
</script>

<div class="container">
	<Reader text={spanish1} lang={LanguageCode.Spanish} userLang={$userLanguage} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}
</style>
