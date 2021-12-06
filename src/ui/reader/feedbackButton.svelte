<script lang="ts">
	import { session } from '$app/stores';
	import Button from '@smui/button/Button.svelte';
	import Dialog, { Actions, Content, Header, Title } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import type { ContentItem } from 'src/types/content.types';
	import Snackbar, {
		Actions as SnackBarActions,
		Label,
		SnackbarComponentDev
	} from '@smui/snackbar';
	import { t } from '../../i18n/i18n';
	import { endpoint } from '../../data/endpoint';
	import { goto } from '$app/navigation';
	import ProgressButton from '../widgets/ProgressButton.svelte';

	export let content: ContentItem;
	let snackbar: SnackbarComponentDev;

	const canDelete =
		$session.user?.isAdmin || ($session.user && content.userId?.toString() === $session.user?.id);
	let isOpen = false;
	let reportText = '';

	function onOpen() {
		isOpen = true;
	}

	let isDeleting = false;

	async function onDelete(e: Event) {
		e.stopPropagation();
		isDeleting = true;
		await fetch(`${endpoint}/content/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				authToken: $session.user?.authToken
			},
			body: JSON.stringify({
				id: content._id
			})
		});
		isDeleting = false;
		goto('/');
	}

	function onReport() {
		snackbar.open();
		fetch(`${endpoint}/content/report`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: content._id,
				title: content.title,
				reason: reportText
			})
		});
		reportText = '';
	}
</script>

<IconButton class="material-icons" on:click={onOpen}>
	{canDelete ? 'delete' : 'report_problem'}
</IconButton>
<Snackbar bind:this={snackbar}>
	<Label>{$t('feedback.reportSuccess')}</Label>
	<SnackBarActions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</SnackBarActions>
</Snackbar>
{#if canDelete}
	<Dialog bind:open={isOpen}>
		<Header>
			<Title>{$t('feedback.delete')}</Title>
		</Header>
		<Content>
			<p>{$t('feedback.deleteConfirm')}</p>
		</Content>
		<Actions>
			<Button color="secondary">{$t('feedback.cancel')}</Button>
			<ProgressButton color="primary" onClick={onDelete} inProgress={isDeleting}
				>{$t('feedback.delete')}</ProgressButton
			>
		</Actions>
	</Dialog>
{:else}
	<Dialog bind:open={isOpen}>
		<Header>
			<Title>{$t('feedback.report')}</Title>
		</Header>
		<Content>
			<p>{$t('feedback.reportPrompt')}</p>
			<Textfield bind:value={reportText} textarea style="width:100%" />
		</Content>
		<Actions>
			<Button color="secondary">{$t('feedback.cancel')}</Button>
			<Button color="primary" disabled={!reportText} on:click={onReport}
				>{$t('feedback.report')}</Button
			>
		</Actions>
	</Dialog>
{/if}
