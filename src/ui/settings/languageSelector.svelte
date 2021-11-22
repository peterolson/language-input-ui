<script lang="ts">
	import { LanguageCode, languageNames } from '../../types/dictionary.types';
	import { settings } from '../../data/settings';

	const { userLanguage } = settings;

	let languages = Object.entries(LanguageCode).sort((a, b) => {
		return languageNames[a[1]].localeCompare(languageNames[b[1]]);
	});
</script>

<select bind:value={$userLanguage} class="mdc-typography--body1">
	{#each languages as [_, value]}
		<option {value} class="mdc-typography--body1">{languageNames[value]}</option>
	{/each}
</select>
