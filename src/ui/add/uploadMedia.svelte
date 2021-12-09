<script lang="ts">
	import MediaView from '../reader/media/mediaView.svelte';
	import type { Media } from '../../types/media.types';
	import UploadFile from './uploadFile.svelte';
	import { t } from '../../i18n/i18n';
	let media: Media;
	export let onUploadMedia: (item: { media: Media; duration: number; timings: any[] }) => void;

	async function checkErrors(file: File) {
		const type = file.type;
		if (!type.includes('audio') && !type.includes('video')) {
			return $t('add.upload.typeError');
		}
	}

	function onUploaded(file: File, url: string) {
		const type = file.type;
		if (type.includes('audio')) {
			media = {
				type: 'audio',
				url
			};
		} else {
			media = {
				type: 'video',
				url
			};
		}
		const audio = new Audio(url);
		audio.onloadedmetadata = () => {
			onUploadMedia({
				media,
				duration: audio.duration,
				timings: []
			});
		};
	}
</script>

<UploadFile {checkErrors} {onUploaded} />
{#if media}
	{#key media}
		<MediaView {media} />
	{/key}
{/if}
