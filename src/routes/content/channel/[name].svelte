<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async function ({ page, fetch }) {
		const { name } = page.params;
		return {
			props: {
				name
			}
		};
	};
</script>

<script lang="ts">
	import ContentList from '../../../ui/content/ContentList.svelte';

	export let name: string;
	console.log(name);
</script>

<ContentList requestHandler={`/content/channel?name=${name}&`} />
