<script lang="ts">
	import { fade } from 'svelte/transition';

	import type { DictionaryExample } from '../../types/dictionary.types';

	export let example: DictionaryExample;
</script>

<div class="mdc-typography--body2 example" in:fade>
	<div class="source">
		<span class="prefix">{example.sourcePrefix}</span><span class="term">{example.sourceTerm}</span
		><span class="suffix">{example.sourceSuffix}</span>
	</div>
	<div class="target">
		<span class="prefix">{example.targetPrefix}</span><span class="term">{example.targetTerm}</span
		><span class="suffix">{example.targetSuffix}</span>
	</div>
</div>

<style>
	.example {
		padding: 4px;
	}
	.target .prefix,
	.target .suffix {
		opacity: 0.7;
	}
	.term {
		background-color: var(--highlight-color);
		border-radius: 4px;
		padding: 2px;
	}
</style>
