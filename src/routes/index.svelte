<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { endpoint } from '../data/endpoint';
	import type { ContentItemSummary } from '../types/content.types';

	export const load: Load = async function ({ page, fetch }) {
		const response: ContentItemSummary[] = await fetch(`${endpoint}/content/newest`).then((x) =>
			x.json()
		);
		return {
			props: {
				contentList: response
			}
		};
	};
</script>

<script lang="ts">
	import ContentList from '../ui/content/ContentList.svelte';

	export let contentList: ContentItemSummary[];
</script>

<ContentList {contentList} />
