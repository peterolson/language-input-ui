<script lang="ts">
	import { LanguageCode, languageNames } from '../../types/dictionary.types';
	import { settings } from '../../data/settings';
	import { normalizeLanguageCode } from '../../data/util';
	import Button from '@smui/button';
	import { onMount } from 'svelte';
	import { t } from '../../i18n/i18n';
	import { endpoint } from '../../data/endpoint';
	import { addImportToHistory } from '../../data/history';
	import { goto } from '$app/navigation';
	import CircularProgress from '@smui/circular-progress';
	const { targetLanguages } = settings;

	export let duration: number;
	export let subtitles: Record<LanguageCode, { url: string; ext: string }[]>;
	export let youtubeId: string;

	let possibleLanguages = Object.keys(subtitles).filter(
		(x) => normalizeLanguageCode(x) in languageNames
	) as LanguageCode[];
	let selectedLanguageCode =
		possibleLanguages.filter((x) => $targetLanguages.includes(normalizeLanguageCode(x)))[0] ||
		possibleLanguages[0];

	let subtitleText = '';
	async function loadSubtitleText(subtitles: { url: string; ext: string }[]) {
		subtitleText = '';
		const url = subtitles.filter((x) => x.ext === 'vtt')[0].url;
		subtitleText = await fetch(url).then((x) => x.text());
	}

	onMount(() => {
		loadSubtitleText(subtitles[selectedLanguageCode]);
	});

	let isImporting = false;
	let hasError = false;
	async function onImport(selectedLanguageCode: LanguageCode, subtitleText: string) {
		isImporting = true;
		const response = await fetch(`${endpoint}/content/youtube`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				lang: selectedLanguageCode,
				youtubeId: youtubeId,
				vtt: subtitleText,
				duration
			})
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				hasError = true;
			})
			.catch((e) => {
				hasError = true;
			});
		const id = response?.id;
		if (!id) {
			hasError = true;
			return;
		}
		addImportToHistory(id);
		isImporting = false;
		goto(`/content/${id}`);
	}
</script>

<div class="container">
	{#if possibleLanguages.length}
		<div class="languageSelector">
			<select
				class="mdc-typography--body1"
				bind:value={selectedLanguageCode}
				on:change={() => loadSubtitleText(subtitles[selectedLanguageCode])}
			>
				{#each possibleLanguages as language}
					<option value={language}>{languageNames[normalizeLanguageCode(language)]}</option>
				{/each}
			</select>
		</div>
		{#if subtitleText}
			<div class="subtitleText">
				{subtitleText.split('\n\n').slice(1).join('\n\n')}
			</div>
			<div class="button">
				{#if hasError}
					<div class="mdc-typography--body1 error">{$t('add.importError')}</div>
				{:else if isImporting}
					<CircularProgress style="height: 32px; width: 32px; padding-right: 16px;" indeterminate />
				{:else}
					<Button
						variant="unelevated"
						on:click={() => onImport(selectedLanguageCode, subtitleText)}
					>
						{$t('add.import')}
					</Button>
				{/if}
			</div>
		{/if}
	{:else}
		<div class="mdc-typography--body1 error">{$t('add.noSubtitles')}</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: auto;
		width: 100%;
	}
	.error {
		padding: 8px;
	}
	.languageSelector {
		margin: 8px;
		text-align: center;
	}
	.subtitleText {
		white-space: pre-wrap;
		font-family: monospace;
		flex: 1;
		overflow: auto;
		overflow-x: hidden;
		width: 100%;
		text-align: center;
	}
	.button {
		margin: 8px;
		text-align: center;
	}
</style>
