<script>
	import AddText from '../../ui/add/addText.svelte';
	import { session } from '$app/stores';
	import Login from '../account/login.svelte';
</script>

{#if $session.user}
	<AddText />
{:else}
	<Login />
{/if}
