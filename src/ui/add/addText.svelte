<script lang="ts">
	import Textfield from '@smui/textfield';
	import { LanguageCode, languageNames } from '../../types/dictionary.types';
	import Checkbox from '@smui/checkbox';
	import AddMedia from './addMedia.svelte';

	let title = '';
	let text = '';
	let url = '';
	let selectedLanguage: LanguageCode = LanguageCode.English;
	let isPublic = false;
</script>

<div class="container">
	<div class="padded">
		<Textfield label={'Title'} bind:value={title} style="width:100%; margin-bottom:12px" />
		<Textfield
			label={'Text'}
			bind:value={text}
			textarea
			input$rows={5}
			style="width:100%; margin-bottom:8px"
		/>
		<select class="mdc-typography--body2" bind:value={selectedLanguage}>
			{#each Object.values(LanguageCode).sort() as lang}
				<option value={lang}>{languageNames[lang]}</option>
			{/each}
		</select>
		<AddMedia lang={selectedLanguage} {text} />
		<Textfield label={'Source URL'} bind:value={url} style="width:100%" />
		<div class="mdc-typography--caption" style="margin-bottom: 8px;">
			Where does this content come from?
		</div>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<Checkbox touch bind:checked={isPublic} />
			<div class="mdc-typography--body2">
				Make public
				<div class="mdc-typography--caption">All users can see public content.</div>
			</div>
		</label>
	</div>
</div>

<style>
	.container {
		width: 100%;
		max-width: 640px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		flex-direction: column;
		height: 100%;
	}

	.padded {
		padding: 16px;
	}

	select {
		width: 100%;
		margin-bottom: 16px;
	}

	label {
		display: flex;
		align-items: center;
	}
</style>
