<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Icon, Label } from '@smui/button';
	import LanguageSelector from './languageSelector.svelte';
	import { t } from '../../i18n/i18n';
	import TargetLanguageSelector from './targetLanguageSelector.svelte';
	import { settings } from '../../data/settings';
	import { languageNames } from '../../types/dictionary.types';

	export let open: boolean;

	const { targetLanguages, darkMode } = settings;
	function onSwitch() {
		darkMode.set(!$darkMode);
	}
</script>

<Dialog bind:open fullscreen>
	<Title
		><div class="settingsTitle">
			{$t('settings.title')}
		</div></Title
	>
	<Content>
		<div class="opposite">
			<Label>{!$darkMode ? $t('settings.darkMode') : $t('settings.lightMode')}&nbsp;</Label>
			<Button on:click={onSwitch}>
				<Icon class="material-icons">{!$darkMode ? 'dark_mode' : 'light_mode'}</Icon>
			</Button>
		</div>
		<div class="opposite">
			<Label>{$t('settings.userLanguageTitle')}&nbsp;</Label>
			<LanguageSelector />
		</div>
		<div class="opposite">
			<Label>{$t('settings.targetLanguagesTitle')}:&nbsp;</Label>
		</div>
		<div>{$targetLanguages.map((x) => languageNames[x]).join(', ') || ' '}</div>
		<TargetLanguageSelector />
	</Content>
	<Actions>
		<Button>
			<Label>{$t('settings.close')}</Label>
		</Button>
	</Actions>
</Dialog>

<style>
	.settingsTitle {
		margin-top: -32px;
		margin-left: 16px;
	}
	.opposite {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 36px;
	}

	.opposite:first-child {
		padding-right: 8px;
	}
</style>
