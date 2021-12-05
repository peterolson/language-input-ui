<script lang="ts">
	import MediaView from '../reader/media/mediaView.svelte';
	import type { Media } from '../../types/media.types';
	import Error from '../widgets/Error.svelte';
	let media: Media;
	let error = '';

	const onUpload: svelte.JSX.FormEventHandler<HTMLInputElement> = (e) => {
		error = '';
		const target = e.target as HTMLInputElement;
		if (!target) return;
		const files = target.files;
		if (!files?.length) return;
		const file = files[0];
		const type = file.type;
		const size = file.size;

		// limit size to 20MB
		if (size > 20 * 1024 * 1024) {
			error = 'File size is too large. Max size is 20MB.';
			return;
		}

		const url = URL.createObjectURL(file);
		if (type.includes('audio')) {
			media = {
				type: 'audio',
				url
			};
		} else if (type.includes('video')) {
			media = {
				type: 'video',
				url
			};
		} else {
			error = 'File must be a video or audio file';
		}
	};
</script>

<div class="dropTarget mdc-typography--body2">
	Drop files here
	<hr />
	or<br />
	<input type="file" class="mdc-typography--body2" on:change={onUpload} />
</div>
{#if error}
	<Error>{error}</Error>
{:else if media}
	{#key media}
		<MediaView {media} />
	{/key}
{/if}

<style>
	.dropTarget {
		border: 1px dotted var(--foreground);
		margin: 8px 0;
		padding: 16px;
		text-align: center;
	}
</style>
