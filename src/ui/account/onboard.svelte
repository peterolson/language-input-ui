<script lang="ts">
	import { t } from '../../i18n/i18n';
	import { fade } from 'svelte/transition';
	import LanguageSelector from '../settings/languageSelector.svelte';
	import Checkbox from '@smui/checkbox';
	import { LanguageCode, languageNames } from '../../types/dictionary.types';
	import Button from '@smui/button';
	import { settings } from '../../data/settings';

	const { targetLanguages } = settings;

	export let onStart: () => void;

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

<div class="container" in:fade>
	<div class="mdc-typography--headline5 content">
		<div>
			{$t('settings.userLanguageTitle')}<br />
			<LanguageSelector /><br />
		</div>
		<hr />
		<div>
			{$t('settings.targetLanguagesTitle')}
			<div class="targetLanguages mdc-typography--body1">
				{#each Object.entries(LanguageCode).sort( ([_1, a], [_2, b]) => languageNames[a].localeCompare(languageNames[b]) ) as [en, code]}
					<div class="targetLanguage">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label>
							<Checkbox
								checked={$targetLanguages.includes(code)}
								on:click={onClickCheckbox}
								value={code}
							/>
							{languageNames[code]}
						</label>
					</div>
				{/each}
			</div>
		</div>
		<div>
			<Button
				variant="unelevated"
				style="width: 100%"
				disabled={$targetLanguages.length < 1}
				on:click={onStart}
			>
				{$t('settings.start')}
			</Button>
		</div>
	</div>
</div>

<style>
	.container {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: var(--foreground);
		color: var(--theme-foreground);
		z-index: 1;
	}

	.content {
		text-align: center;
		margin: auto;
		margin-top: 5%;
		max-width: 640px;
		width: 100%;
		background-color: var(--theme-background);
		border-radius: 16px;
	}

	.content > div {
		padding: 16px;
	}

	.targetLanguage {
		width: 33%;
	}

	.targetLanguages {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		text-align: left;
		margin-bottom: 16px;
	}

	label {
		display: flex;
		align-items: center;
	}

	@media (max-width: 640px) {
		.targetLanguage {
			width: 50%;
		}

		.content {
			margin-top: 0;
			border-radius: 0;
		}
	}
</style>
