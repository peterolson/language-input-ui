<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Icon, Label } from '@smui/button';
	import LanguageSelector from './languageSelector.svelte';
	import { t } from '../../i18n/i18n';
	export let open: boolean;

	let lightTheme =
		typeof window === 'undefined' || window.matchMedia('(prefers-color-scheme: light)').matches;
	function switchTheme() {
		lightTheme = !lightTheme;
		let themeLink = document.head.querySelector<HTMLLinkElement>('#theme');
		if (!themeLink) {
			themeLink = document.createElement('link');
			themeLink.rel = 'stylesheet';
			themeLink.id = 'theme';
		}
		themeLink.href = `/smui${lightTheme ? '' : '-dark'}.css`;
		document.head
			.querySelector<HTMLLinkElement>('link[href="/smui-dark.css"]')
			?.insertAdjacentElement('afterend', themeLink);
	}
</script>

<Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
	<Title>{$t('settings.title')}</Title>
	<Content>
		<div class="opposite">
			<Label>{lightTheme ? $t('settings.darkMode') : $t('settings.lightMode')}&nbsp;</Label>
			<Button on:click={switchTheme}>
				<Icon class="material-icons">{lightTheme ? 'dark_mode' : 'light_mode'}</Icon>
			</Button>
		</div>
		<div class="opposite">
			<Label>{$t('settings.userLanguageTitle')}&nbsp;</Label>
			<LanguageSelector />
		</div>
	</Content>
	<Actions>
		<Button>
			<Label>{$t('settings.close')}</Label>
		</Button>
	</Actions>
</Dialog>

<style>
	.opposite {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.opposite:first-child {
		padding-right: 8px;
	}
</style>
