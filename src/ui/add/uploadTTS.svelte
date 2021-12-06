<script lang="ts">
	import type { Media } from '../../types/media.types';

	import { onMount } from 'svelte';
	import { getSSML, speak } from '../../data/speech';
	import { voices } from '../../data/voices';
	import type { LanguageCode } from '../../types/dictionary.types';
	import ProgressButton from '../widgets/ProgressButton.svelte';
	import MediaView from '../reader/media/mediaView.svelte';
	import Error from '../widgets/Error.svelte';

	export let lang: LanguageCode;
	export let text: string;
	export let onUploadMedia: (item: { media: Media; duration: number; timings: any[] }) => void;

	const possibleVoices = voices[lang];
	let selectedVoice = possibleVoices[0];
	let isGenerating = false;
	let media: Media;
	let error = '';

	function onPreview() {
		const textSample = text.split(' ').slice(0, 5).join(' ').slice(0, 50);
		speak(textSample, selectedVoice);
		isGenerating = false;
		media = null as any;
		error = '';
	}

	onMount(() => {
		onPreview();
	});

	async function onGenerate() {
		if (isGenerating) {
			return;
		}
		error = '';
		isGenerating = true;
		const ssml = getSSML(text, selectedVoice);

		const { timings, url } = await fetch('/speech/tts.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ssml
			})
		}).then((res) => res.json());

		const audio = new Audio(url);
		media = {
			type: 'audio',
			url
		};
		isGenerating = false;
		audio.addEventListener('loadedmetadata', () => {
			if (audio.duration >= 10 * 60 - 10) {
				error = 'Text is too long. Max duration is 10 minutes.';
				media = null as any;
			}
			onUploadMedia({ media, duration: audio.duration, timings });
		});
	}
</script>

<div class="container">
	<select class="mdc-typography--body1" bind:value={selectedVoice} on:change={onPreview}>
		{#each possibleVoices as voice}
			<option value={voice}>
				{voice.name.split('-').slice(-1)[0].replace('Neural', '')}
				({voice.region})
				{voice.isFemale ? 'Female' : 'Male'}
			</option>
		{/each}
	</select>
	<ProgressButton
		inProgress={isGenerating}
		onClick={onGenerate}
		disabled={isGenerating || !text.length}
	>
		Generate
	</ProgressButton>
</div>
<div>
	{#if error}
		<Error>{error}</Error>
	{:else if media}
		{#key media}
			<MediaView {media} />
		{/key}
	{/if}
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
