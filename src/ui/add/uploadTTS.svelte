<script lang="ts">
	import Button, { Icon } from '@smui/button';
	import { speak } from '../../data/speech';
	import { voices } from '../../data/voices';
	import type { LanguageCode } from '../../types/dictionary.types';

	export let lang: LanguageCode;
	export let text: string;

	const possibleVoices = voices[lang];
	let selectedVoice = possibleVoices[0];

	function onPreview() {
		const textSample = text.split(' ').slice(0, 10).join(' ').slice(0, 100);
		speak(textSample, selectedVoice);
	}
</script>

<div class="container">
	<select class="mdc-typography--body1" bind:value={selectedVoice}>
		{#each possibleVoices as voice}
			<option value={voice}>
				{voice.name.split('-').slice(-1)[0].replace('Neural', '')}
				({voice.region})
				{voice.isFemale ? 'Female' : 'Male'}
			</option>
		{/each}
	</select>
	<Button on:click={onPreview}>
		<Icon class="material-icons">volume_up</Icon>
		Preview
	</Button>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
