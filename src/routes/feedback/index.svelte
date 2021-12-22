<script lang="ts">
	import { endpoint } from '../../data/endpoint';
	import { onMount } from 'svelte';
	import { getSession } from '../../data/session';
	import type { Feedback } from './feedback.types';
	import ProgressButton from '../../ui/widgets/ProgressButton.svelte';

	let feedback: Feedback[] = [];
	let inProgress = false;

	async function refreshFeedback() {
		const authToken = getSession().user?.authToken as string;
		const res = await fetch(endpoint + '/content/report', {
			headers: {
				authToken,
				'Content-Type': 'application/json'
			}
		});
		feedback = await res.json();
	}
	onMount(refreshFeedback);

	const respond = (shouldDelete: boolean, contentId: string) => async () => {
		inProgress = true;
		const authToken = getSession().user?.authToken as string;
		await fetch(endpoint + '/content/report/respond', {
			method: 'POST',
			headers: {
				authToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				contentId,
				shouldDelete
			})
		});
		await refreshFeedback();
		inProgress = false;
	};
</script>

<div class="container">
	<div class="mdc-typography--h5">User feedback</div>
	<ul>
		{#each feedback as item}
			<li>
				<a class="mdc-typography--body1" href={`/content/${item.contentId}`} target="_blank"
					>{item.contentTitle}</a
				>
				<div class="mdc-typography--body2">{item.reason}</div>
				<small class="mdc-typography--caption">{item.reportedAt}</small>
				<div>
					<ProgressButton {inProgress} onClick={respond(true, item.contentId)}
						>Delete</ProgressButton
					>
					<ProgressButton {inProgress} onClick={respond(false, item.contentId)}
						>Ignore</ProgressButton
					>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.container {
		padding: 16px;
	}
	li {
		padding: 8px;
	}
</style>
