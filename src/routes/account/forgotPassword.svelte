<script lang="ts">
	import Textfield from '@smui/textfield/Textfield.svelte';
	import ProgressButton from '../../ui/widgets/ProgressButton.svelte';
	import { t } from '../../i18n/i18n';
	import { endpoint } from '../../data/endpoint';
	import Error from '../../ui/widgets/Error.svelte';

	let usernameOrEmail = '';
	let inProgress = false;
	let message = '';
	let isError = true;

	async function onClick() {
		inProgress = true;
		isError = false;
		message = '';
		const { protocol, host } = window.location;
		const res = await fetch(endpoint + '/user/forgot-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				usernameOrEmail,
				resetURL: `${protocol}//${host}/account/resetPassword`
			})
		});
		if (res.ok) {
			const json = await res.json();
			message = $t('user.resetPassword') + ' ' + json.email;
		} else {
			message = $t('user.noAccountFound');
			isError = true;
		}
		usernameOrEmail = '';
		inProgress = false;
	}
</script>

<div class="mdc-typography--body1 container">
	{$t('user.forgotPassword')}
	<Textfield
		label={`${$t('user.username')} / ${$t('user.email')}`}
		bind:value={usernameOrEmail}
		style="width:100%"
		type="text"
	/><br />
	<br />
	<ProgressButton
		{inProgress}
		{onClick}
		variant="unelevated"
		style="width:100%"
		disabled={!usernameOrEmail}
	>
		{$t('user.sendResetLink')}
	</ProgressButton><br />
	<br />
	{#if isError && message}
		<Error>{message}</Error>
	{:else}
		{message}
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
