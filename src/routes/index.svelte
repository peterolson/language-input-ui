<script lang="ts">
	import ContentList from '../ui/content/ContentList.svelte';
</script>

<svelte:head>
	<title>Language input</title>
</svelte:head>

<ContentList requestHandler="/content/newest?" />
