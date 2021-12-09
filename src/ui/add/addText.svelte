<script lang="ts">
	import Textfield from '@smui/textfield';
	import { LanguageCode, languageNames } from '../../types/dictionary.types';
	import Checkbox from '@smui/checkbox';
	import AddMedia from './addMedia.svelte';
	import { t } from '../../i18n/i18n';
	import UploadThumbnail from './uploadThumbnail.svelte';
	import type { Media } from '../../types/media.types';
	import { endpoint } from '../../data/endpoint';
	import { session } from '$app/stores';
	import { addImportToHistory } from '../../data/history';
	import { goto } from '$app/navigation';
	import ProgressButton from '../widgets/ProgressButton.svelte';
	import Error from '../widgets/Error.svelte';

	let title = '';
	let text = '';
	let url = '';
	let selectedLanguage: LanguageCode;
	let isPublic = false;
	let duration: number;
	let media: Media;
	let timings: unknown[];
	let thumb: string;
	let isImporting = false;
	let hasError = false;

	function onUploadMedia(item: { media: Media; duration: number; timings: any[] }) {
		media = item.media;
		duration = item.duration;
		timings = item.timings;
		console.log(timings);
	}

	function onUploadThumbnail(item: { thumb: string }) {
		thumb = item.thumb;
	}

	async function onImport() {
		const authToken = $session.user?.authToken as string;
		if (!thumb) {
			hasError = true;
			return;
		}
		if (!url && isPublic) {
			hasError = true;
			return;
		}
		isImporting = true;
		const response = await fetch(`${endpoint}/content/text`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authToken
			},
			body: JSON.stringify({
				lang: selectedLanguage,
				text,
				duration,
				media,
				timings,
				isPrivate: !isPublic,
				url,
				title,
				thumb
			})
		}).then((res) => res.json());
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
	<div class="padded">
		<Textfield label={$t('add.title')} bind:value={title} style="width:100%; margin-bottom:12px" />
		<Textfield
			label={$t('add.text')}
			bind:value={text}
			textarea
			input$rows={5}
			style="width:100%; margin-bottom:8px"
		/>
		<select class="mdc-typography--body2" bind:value={selectedLanguage}>
			<option disabled value="">-- {$t('settings.selectLanguage')} --</option>
			{#each Object.values(LanguageCode).sort() as lang}
				<option value={lang}>{languageNames[lang]}</option>
			{/each}
		</select>
		{#if title && text && selectedLanguage}
			<AddMedia lang={selectedLanguage} {text} {onUploadMedia} />
			{#if duration}
				<hr />
				<UploadThumbnail {title} {text} lang={selectedLanguage} {duration} {onUploadThumbnail} />
				<Textfield label={$t('add.sourceURL')} bind:value={url} style="width:100%" />
				<div class="mdc-typography--caption" style="margin-bottom: 8px;">
					{$t('add.sourceHelper')}
				</div>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label>
					<Checkbox touch bind:checked={isPublic} />
					<div class="mdc-typography--body2">
						{$t('add.public')}
						<div class="mdc-typography--caption">{$t('add.publicHelper')}</div>
					</div>
				</label>
				<br />
				<ProgressButton
					variant="unelevated"
					inProgress={isImporting}
					onClick={onImport}
					disabled={(isPublic && !url) || !thumb}
				>
					{$t('add.import')}
				</ProgressButton>
				{#if hasError}
					<Error>{$t('add.importError')}</Error>
				{/if}
			{/if}
		{/if}
	</div>
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

	.padded {
		padding: 16px;
	}

	select {
		width: 100%;
		margin-bottom: 16px;
	}

	label {
		display: flex;
		align-items: center;
	}
</style>
