<script lang="ts">
	import Button from '@smui/button/Button.svelte';
	import Textfield from '@smui/textfield';
</script>

<div class="container">
	<Textfield label="Username" value="" /><br />
	<Textfield label="Password" value="" type="password" /><br />
	<Button>Login</Button>
	<div class="mdc-typography--body1">
		Or <a href="/account/create">create account</a>
	</div>
</div>

<style>
	.container {
		padding: 8px;
		margin: 0 auto;
	}
</style>
