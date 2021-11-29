<script lang="ts">
	import Button from '@smui/button/Button.svelte';
	import Textfield from '@smui/textfield';
	import { t } from '../../i18n/i18n';
	import { page } from '$app/stores';
	import Error from '../widgets/Error.svelte';

	let username = '';
	let password = '';
	let confirmPassword = '';

	let error = decodeURIComponent($page.query.get('error') || '');
	if (error.includes('exists')) {
		error = $t('user.accountExists');
	} else if (error.includes('match')) {
		error = $t('user.passwordDoesNotMatch');
	} else if (error) {
		error = $t('user.createError');
	}
</script>

<form class="container" action="/account/create.json" method="post">
	<Textfield label={$t('user.username')} bind:value={username} style="width:100%" />
	<input type="hidden" name="username" value={username} />
	<br />
	<Textfield label={$t('user.password')} bind:value={password} type="password" style="width:100%" />
	<input type="hidden" name="password" value={password} />
	<br />
	<Textfield
		label={$t('user.confirmPassword')}
		bind:value={confirmPassword}
		type="password"
		style="width:100%"
	/>
	<input type="hidden" name="confirmPassword" value={confirmPassword} />
	<br />
	<div class="button">
		<Button variant="unelevated" style="width:100%" disabled={!username || !password}
			>{$t('user.createAccount')}</Button
		>
	</div>
	<div class:hidden={!error}>
		<Error>{error}</Error>
	</div>
	<div class="mdc-typography--body1">
		{$t('user.hasAccount')}<br />
		<a href="/account/login">{$t('user.login')}</a>
	</div>
</form>

<style>
	.container {
		padding: 8px;
		margin: 0 auto;
		max-width: 400px;
		width: 100%;
	}
	.button {
		margin-top: 8px;
		margin-bottom: 8px;
	}
	.hidden {
		visibility: hidden;
	}
</style>
