<script lang="ts">
	import { page } from '$app/stores';
	import Button from '@smui/button';

	import Textfield from '@smui/textfield';
	import { t } from '../../i18n/i18n';
	import Error from '../widgets/Error.svelte';

	let username = '';
	let password = '';

	let error = $page.query.get('error') || '';
</script>

<form class="container" action="/account/login.json" method="post">
	<Textfield label={$t('user.username')} bind:value={username} style="width:100%" />
	<input type="hidden" name="username" value={username} />
	<br />
	<Textfield label={$t('user.password')} bind:value={password} style="width:100%" type="password" />
	<input type="hidden" name="password" value={password} />
	<br />
	<div class="button">
		<Button variant="unelevated" style="width:100%" disabled={!username || !password} type="submit">
			{$t('user.login')}
		</Button>
	</div>
	<div class:hidden={!error}>
		<Error>{$t('user.loginError')}</Error>
	</div>
	<div class="mdc-typography--body1">
		{$t('user.noAccount')}<br />
		<a href="/account/create">{$t('user.createAccount')}</a><br />
		<br />
		<a href="/account/forgotPassword">{$t('user.forgotPassword')}</a><br />
	</div>
</form>

<style>
	.container {
		padding: 8px;
		margin: 0 auto;
		max-width: 400px;
		width: 100%;
	}

	.hidden {
		visibility: hidden;
	}

	.button {
		margin-top: 8px;
		margin-bottom: 8px;
	}
</style>
