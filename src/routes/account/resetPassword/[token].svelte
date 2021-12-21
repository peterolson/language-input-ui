<script lang="ts">
	import { page } from '$app/stores';
	import Textfield from '@smui/textfield/Textfield.svelte';
	import ProgressButton from '../../../ui/widgets/ProgressButton.svelte';
	import { t } from '../../../i18n/i18n';
	import Error from '../../../ui/widgets/Error.svelte';
	import { endpoint } from '../../../data/endpoint';

	const resetCode = $page.params.token;
	let password = '';
	let confirmPassword = '';
	let inProgress = false;
	let error = '';
	let success = false;

	async function onClick() {
		error = '';
		success = false;
		if (password !== confirmPassword) {
			error = $t('user.passwordDoesNotMatch');
			return;
		}
		inProgress = true;
		const res = await fetch(endpoint + '/user/reset-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password,
				resetCode
			})
		});
		if (res.ok) {
			success = true;
		} else {
			error = $t('user.changePasswordError');
			const json = await res.json();
			error = error + ' ' + json.message;
		}
		inProgress = false;
	}
</script>

<div class="mdc-typography--body1 container">
	{#if success}
		{$t('user.changePasswordSuccess')}<br />
		<a href="/account/login">{$t('user.login')}</a>
	{:else}
		<Textfield
			label={$t('user.password')}
			bind:value={password}
			type="password"
			style="width:100%"
		/>
		<Textfield
			label={$t('user.confirmPassword')}
			bind:value={confirmPassword}
			type="password"
			style="width:100%"
		/>
		<br />
		<br />
		<ProgressButton
			{inProgress}
			{onClick}
			variant="unelevated"
			style="width:100%"
			disabled={!password}
		>
			{$t('user.sendResetLink')}
		</ProgressButton><br />
		<br />
		{#if error}
			<Error>{error}</Error>
		{/if}
	{/if}
</div>

<style>
	.container {
		padding: 16px;
		margin: 0 auto;
		width: 100%;
		max-width: 640px;
	}
</style>
