<script lang="ts">
	import Button from '@smui/button/Button.svelte';
	import CircularProgress from '@smui/circular-progress';
	export let inProgress: boolean;
	export let onClick: (e: Event) => void;
</script>

<Button {...$$restProps} disabled={inProgress || $$restProps.disabled} on:click={onClick}>
	{#if inProgress}
		<CircularProgress style="width:32px;height:32px;position:absolute;" indeterminate />
	{/if}
	<slot />
</Button>
