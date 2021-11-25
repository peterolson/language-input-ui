<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { DictionaryExample } from '../../types/dictionary.types';
	import { settings } from '../../data/settings';
	const { isTraditional } = settings;

	export let example: DictionaryExample;

	function getProperty(
		example: DictionaryExample,
		key: keyof DictionaryExample,
		isTraditional: boolean
	): string {
		if (key + 'Trad' in example && isTraditional) {
			return example[(key + 'Trad') as keyof DictionaryExample] as string;
		}
		return example[key] as string;
	}
</script>

<div class="mdc-typography--body2 example" in:fade>
	<div class="source">
		<span class="prefix">{getProperty(example, 'sourcePrefix', $isTraditional)}</span><span
			class="term">{getProperty(example, 'sourceTerm', $isTraditional)}</span
		><span class="suffix">{getProperty(example, 'sourceSuffix', $isTraditional)}</span>
	</div>
	<div class="target">
		<span class="prefix">{getProperty(example, 'targetPrefix', $isTraditional)}</span><span
			class="term">{getProperty(example, 'targetTerm', $isTraditional)}</span
		><span class="suffix">{getProperty(example, 'targetSuffix', $isTraditional)}</span>
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
