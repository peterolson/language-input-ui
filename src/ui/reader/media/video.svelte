<script lang="ts">
	export let url: string;
</script>

<div class="container">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video controls>
		<source src={url} />
	</video>
</div>

<style>
	.container {
		height: 40vh;
		text-align: center;
	}

	video {
		height: 100%;
	}
</style>
