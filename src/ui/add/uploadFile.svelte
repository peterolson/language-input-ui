<script lang="ts">
	import Button from '@smui/button/Button.svelte';
	import CircularProgress from '@smui/circular-progress';
	import Error from '../widgets/Error.svelte';
	let error = '';
	let uploadedFile: File;
	let isUploading = false;
	export let checkErrors: (file: File) => Promise<string | undefined>;
	export let onUploaded: (file: File, url: string) => void;

	const uploadFile = async (file: File) => {
		error = '';
		const size = file.size;

		// limit size to 20MB
		if (size > 20 * 1024 * 1024) {
			error = 'File size is too large. Max size is 20MB.';
			return;
		}

		const errors = await checkErrors(file);
		if (errors) {
			error = errors;
			return;
		}

		uploadToS3(file);
	};

	async function uploadToS3(file: File) {
		isUploading = true;
		uploadedFile = file;
		let { name, type } = file;
		const { signedURL, key, endpoint } = await fetch(
			`/api/signedURL.json?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`
		).then((res) => res.json());
		await fetch(signedURL, {
			method: 'PUT',
			body: file
		});
		const url = `${endpoint}/${key}`;
		isUploading = false;
		onUploaded(file, url);
	}

	const onUpload: svelte.JSX.FormEventHandler<HTMLInputElement> = (e) => {
		const target = e.target as HTMLInputElement;
		if (!target) return;
		const files = target.files;
		if (!files?.length) return;
		const file = files[0];
		uploadFile(file);
	};

	let isDragging = false;
	function onDragEnter(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		isDragging = true;
	}

	function onDragLeave(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		isDragging = false;
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		isDragging = false;
		const dt = e.dataTransfer;
		if (!dt) return;
		const files = dt.files;
		uploadFile(files[0]);
	}

	function formatFileSize(bytes: number) {
		const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) return '0 bytes';
		const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
		return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
	}

	function onCancel() {
		uploadedFile = null as any;
	}
</script>

<div
	class="dropTarget mdc-typography--body2"
	class:dragging={isDragging}
	on:dragenter={onDragEnter}
	on:dragleave={onDragLeave}
	on:dragover={onDragEnter}
	on:drop={onDrop}
>
	{#if uploadedFile}
		{uploadedFile.name}<br />
		{uploadedFile.type}<br />
		{formatFileSize(uploadedFile.size)}<br />
		<Button on:click={onCancel}>Change file</Button>
	{:else}
		Drop file here
		<hr />
		or<br />
		<input type="file" class="mdc-typography--body2" on:change={onUpload} />
	{/if}
</div>
{#if error}
	<Error>{error}</Error>
{/if}
{#if isUploading}
	<CircularProgress style="height: 32px; width: 32px; padding-right: 16px;" indeterminate />
{/if}

<style>
	.dropTarget {
		border: 1px dotted var(--foreground);
		margin: 8px 0;
		padding: 16px;
		text-align: center;
	}

	.dragging {
		background-color: rgba(64, 255, 64, 0.3);
	}
</style>
