<script lang="ts">
	import Radio from '@smui/radio';
	import FormField from '@smui/form-field';
	import UploadMedia from './uploadMedia.svelte';
	import UploadTts from './uploadTTS.svelte';
	import type { LanguageCode } from '../../types/dictionary.types';

	export let lang: LanguageCode;
	export let text: string;
	let selected = 'upload';
</script>

<div class="radio-group mdc-typography--body1">
	<FormField>
		<Radio bind:group={selected} value="upload" />
		<span slot="label">Upload audio / video</span>
	</FormField>
	<FormField>
		<Radio bind:group={selected} value="tts" />
		<span slot="label">Read with text-to-speech</span>
	</FormField>
	<FormField>
		<Radio bind:group={selected} value="noMedia" />
		<span slot="label">No audio</span>
	</FormField>
</div>

{#if selected === 'upload'}
	<UploadMedia />
{:else if selected === 'tts'}
	{#key lang}
		<UploadTts {lang} {text} />
	{/key}
{/if}

<style>
	.radio-group > :global(div) {
		display: flex;
	}
	.radio-group span {
		margin-left: 8px;
	}
</style>
