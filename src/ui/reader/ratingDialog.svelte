<script lang="ts">
	import Button from '@smui/button/Button.svelte';
	import { Icon } from '@smui/common';
	import Dialog, { Header, Title, Actions } from '@smui/dialog';
	import { t } from '../../i18n/i18n';
	import { createEventDispatcher } from 'svelte';
	import { rateContent } from '../../data/content';
	const dispatch = createEventDispatcher();

	const buttonStyle = 'flex:1;display:inline-block;text-align:center;height:unset;padding:8px;';
	const iconStyle = 'font-size:300%;height:unset;width:unset;margin:0;padding-bottom:4px;';

	export let open: boolean;
	export let id: string;

	function closeHandler(e: CustomEvent<{ action: string }>) {
		const action = e.detail.action;
		if (action === 'like' || action === 'dislike' || action === 'neutral') {
			rateContent(id, action);
		}
		dispatch('close', { time: e.detail.action });
	}
</script>

<Dialog {open} on:MDCDialog:closed={closeHandler}>
	<Header>
		<Title>{$t('rating.question')}</Title>
	</Header>
	<Actions style="flex-direction:row;align-items:flex-start">
		<Button style={buttonStyle} action="dislike">
			<Icon class="material-icons" style={iconStyle}>sentiment_very_dissatisfied</Icon>
			<div>{$t('rating.no')}</div>
		</Button>
		<Button style={buttonStyle} action="neutral">
			<Icon class="material-icons" style={iconStyle}>sentiment_neutral</Icon><br />
			{$t('rating.neutral')}
		</Button>
		<Button style={buttonStyle} action="like">
			<Icon class="material-icons" style={iconStyle}>sentiment_very_satisfied</Icon><br />
			{$t('rating.yes')}
		</Button>
	</Actions>
</Dialog>
