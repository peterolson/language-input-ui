<script lang="ts">
	import { Icon } from '@smui/common';
	import type { ContentItemSummary } from 'src/types/content.types';
	import type { LanguageCode } from 'src/types/dictionary.types';
	import ContentCard from '../content/ContentCard.svelte';
	import UploadFile from './uploadFile.svelte';
	import { session } from '$app/stores';
	import { t } from '../../i18n/i18n';

	let contentSummary: ContentItemSummary;
	export let title: string;
	export let lang: LanguageCode;
	export let text: string;
	export let duration: number;
	export let onUploadThumbnail: (item: { thumb: string }) => void;

	async function checkErrors(file: File): Promise<string | undefined> {
		const type = file.type;
		if (!type.includes('image')) {
			return $t('add.upload.imageTypeError');
		}
		const size = file.size;
		if (size > 150000) {
			return $t('add.upload.imageSizeError');
		}

		return await new Promise((resolve) => {
			const url = URL.createObjectURL(file);
			const img = new Image();
			img.onload = function () {
				if (img.width < 320 || img.height < 180) {
					resolve($t('add.upload.imageDimensionsError'));
				}
				URL.revokeObjectURL(url);
				resolve(undefined);
			};
			img.src = url;
		});
	}

	function onUploaded(file: File, url: string) {
		contentSummary = {
			_id: '',
			title,
			lang,
			thumb: url,
			lemmas: [],
			wordCount: text.split(' ').length,
			channel: '@' + $session.user.username,
			duration,
			publishedDate: new Date(),
			likes: 0,
			dislikes: 0,
			views: 0,
			neutral: 0
		};
		onUploadThumbnail({ thumb: url });
	}
</script>

<div class="mdc-typography--body1 header">
	<Icon class="material-icons">image</Icon>
	&nbsp; {$t('add.upload.image')}
</div>
<UploadFile {checkErrors} {onUploaded} />
{#if contentSummary}
	<div class="preview">
		<ContentCard content={contentSummary} fullWidth />
		<div class="cover" />
	</div>
{/if}

<style>
	.header {
		display: flex;
		align-items: center;
	}
	.preview {
		width: 100%;
		max-width: 320px;
		position: relative;
	}
	.cover {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}
</style>
