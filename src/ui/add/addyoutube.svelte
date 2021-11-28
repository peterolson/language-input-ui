<script lang="ts">
	import Textfield from '@smui/textfield';
	import { t } from '../../i18n/i18n';
	import YoutubePreview from './youtubePreview.svelte';

	let youtubeURL = '';
	let youtubeId = '';

	$: {
		youtubeId = getYoutubeId(youtubeURL);
	}

	function getYoutubeId(url: string) {
		if (url.includes('v=')) {
			return url.split('v=')[1].split('&')[0];
		}
		if (url.includes('youtu.be/')) {
			return url.split('youtu.be/')[1].split('&')[0];
		}
		return '';
	}
</script>

<div class="container">
	<div class="textFieldContainer">
		<Textfield label={$t('add.youtubeURL')} bind:value={youtubeURL} style="width:100%" />
	</div>
	{#if youtubeId}
		{#key youtubeId}
			<YoutubePreview {youtubeId} />
		{/key}
	{/if}
</div>

<style>
	.container {
		width: 100%;
		max-width: 640px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		flex-direction: column;
		height: 100%;
	}

	.textFieldContainer {
		margin: 8px;
		width: 100%;
	}
</style>
