<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { endpoint } from '../../data/endpoint';
	import type { ContentItem } from '../../types/content.types';

	export const load: Load = async function ({ page, fetch }) {
		const { id } = page.params;
		const response: ContentItem = await fetch(`${endpoint}/content?id=${id}`).then((x) => x.json());
		return {
			props: {
				content: response
			}
		};
	};
</script>

<script lang="ts">
	import Error404 from '../../ui/error/Error404.svelte';
	import Reader from '../../ui/reader/reader.svelte';

	export let content: ContentItem | { statusCode: number; message: string };
</script>

{#if !content || 'statusCode' in content}
	<Error404 message={content?.message || ''} />
{:else}
	{#key content._id}
		<div class="container">
			<Reader {content} />
		</div>
	{/key}
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}
</style>
