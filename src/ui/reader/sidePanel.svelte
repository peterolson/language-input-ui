<script lang="ts">
	import type { ContentItem } from 'src/types/content.types';

	export let content: ContentItem;
</script>

<div class="container">
	<div class="mdc-typography--body1">
		{content.title}
	</div>
	<div class="mdc-typography--body2">
		<a href={`/content/channel/${content.channel}`} sveltekit:prefetch>
			{content.channel}
		</a>
	</div>
	<hr />
</div>

<style>
	.container {
		padding: 8px;
	}
</style>
