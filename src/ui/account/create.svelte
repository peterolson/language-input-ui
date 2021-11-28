<script lang="ts">
	import Button from '@smui/button/Button.svelte';
	import Textfield from '@smui/textfield';
</script>

<div class="container">
	<Textfield label="Username" value="" /><br />
	<Textfield label="Password" value="" type="password" /><br />
	<Textfield label="Confirm password" value="" type="password" /><br />
	<Button>Create account</Button>
	<div class="mdc-typography--body1">
		Or <a href="/account/login">login</a>
	</div>
</div>

<style>
	.container {
		padding: 8px;
		margin: 0 auto;
	}
</style>
