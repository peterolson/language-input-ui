<script lang="ts">
	import { LanguageCode, languageNames } from '../../types/dictionary.types';
	import Checkbox from '@smui/checkbox';
	import { settings } from '../../data/settings';

	const { targetLanguages } = settings;

	function onClickCheckbox(ev: CustomEvent<HTMLInputElement>) {
		const input = ev.target as HTMLInputElement;
		const { value, checked } = input;

		const currentTargetLanguages = new Set($targetLanguages);
		if (checked) {
			currentTargetLanguages.add(value as LanguageCode);
		} else {
			currentTargetLanguages.delete(value as LanguageCode);
		}
		targetLanguages.set(Array.from(currentTargetLanguages));
	}
</script>

<div>
	{#each Object.entries(LanguageCode) as [en, code]}
		<div>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label>
				<Checkbox
					checked={$targetLanguages.includes(code)}
					on:click={onClickCheckbox}
					value={code}
				/>
				{languageNames[code]} ({en})
			</label>
		</div>
	{/each}
</div>

<style>
	label {
		display: flex;
		align-items: center;
	}
</style>
