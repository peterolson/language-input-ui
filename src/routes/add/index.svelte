<script>
	import Button from '@smui/button/Button.svelte';
	import { Icon } from '@smui/common';
</script>

<div class="container">
	<a href="/add/youtube" sveltekit:prefetch>
		<Button variant="unelevated" style="width:100%">
			<Icon class="material-icons">video_library</Icon>
			Import YouTube video
		</Button>
	</a>
	<a href="/add/text" sveltekit:prefetch>
		<Button variant="unelevated" style="width:100%">
			<Icon class="material-icons">post_add</Icon>
			Upload text with audio
		</Button>
	</a>
</div>

<style>
	a {
		display: block;
		padding: 4px;
		text-decoration: none;
	}
	.container {
		max-width: 640px;
		margin: 0 auto;
		padding: 4px;
	}
</style>
