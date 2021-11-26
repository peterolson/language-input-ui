<script lang="ts">
	import { t } from '../../i18n/i18n';
	import type { LanguageCode } from '../../types/dictionary.types';
	import type { Token } from '../../types/parse.types';
	import {
		getColorFromProgressKey,
		getProgressKey,
		knowledgeStore,
		PROGRESS_KEYS,
		setProgressKey
	} from '../../data/knowledge';
	import { settings } from '../../data/settings';

	const { isTraditional, darkMode } = settings;

	export let token: Token;
	export let lang: LanguageCode;
	export let dispatch: (type: string, token: Token) => void;

	function getKnowledgeLevel(token: Token) {
		const text = $isTraditional && token.tradText ? token.tradText : token.text;
		return getProgressKey($knowledgeStore[lang]?.scores || {}, text);
	}

	let knowledgeLevel = getKnowledgeLevel(token);

	function setKnowledgeLevel(level: string) {
		const text = $isTraditional && token.tradText ? token.tradText : token.text;
		setProgressKey(lang, [text, token.lemma], level);
		if (level === 'unknown') {
			dispatch('markUnknown', token);
		} else {
			dispatch('markKnown', token);
		}
	}
</script>

<div>
	<select
		class="mdc-typography--body2"
		bind:value={knowledgeLevel}
		on:change={() => setKnowledgeLevel(knowledgeLevel)}
		style={`background-color:${getColorFromProgressKey(knowledgeLevel, $darkMode)}`}
	>
		{#each [...PROGRESS_KEYS].reverse() as key}
			<option value={key}>{$t(`progress.${key}`)}</option>
		{/each}
	</select>
</div>

<style>
	div {
		padding: 8px;
	}
</style>
