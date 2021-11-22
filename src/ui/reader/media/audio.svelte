<script lang="ts">
	import IconButton from '@smui/icon-button/IconButton.svelte';
	import CircularProgress from '@smui/circular-progress';
	import LinearProgress from '@smui/linear-progress';

	export let url: string;
	let duration: number;
	let currentTime: number;
	let isPaused: boolean = true;

	let audio: HTMLAudioElement;

	function formatTime(currentTime: number, duration: number) {
		let c = currentTime || 0;
		let currentTimeFormatted = Math.floor(c / 60) + ':' + ('0' + Math.floor(c % 60)).slice(-2);
		let durationFormatted =
			Math.floor(duration / 60) + ':' + ('0' + Math.floor(duration % 60)).slice(-2);
		return currentTimeFormatted + ' / ' + durationFormatted;
	}

	function clickProgress(e: MouseEvent) {
		audio.pause();
		let target = e.target as HTMLElement;
		while (!target.classList.contains('progress') && target.parentElement) {
			target = target.parentElement;
		}
		const x = e.pageX - target.offsetLeft;
		const width = target.offsetWidth;
		currentTime = Math.floor((x / width) * duration);
		setTimeout(() => {
			audio.play();
		}, 250);
	}

	function seekForward(x: number) {
		audio.pause();
		audio.currentTime += x;
		setTimeout(() => {
			audio.play();
		}, 100);
	}

	const speeds = [0.25, 0.33, 0.5, 0.66, 0.75, 1, 1.25, 1.5, 1.75, 2];
	let speedIndex = 5;
	function changeSpeed(difference: number) {
		speedIndex = Math.max(0, Math.min(speeds.length - 1, speedIndex + difference));
		audio.playbackRate = speeds[speedIndex];
	}
</script>

<audio
	bind:this={audio}
	bind:duration
	bind:paused={isPaused}
	bind:currentTime
	on:ended={() => (currentTime = 0)}
>
	<source src={url} />
</audio>
<div class="controls">
	{#if duration}
		<IconButton class="material-icons" on:click={() => (isPaused = !isPaused)}>
			{isPaused ? 'play_circle_outline' : 'pause_circle_outline'}
		</IconButton>
		<IconButton class="material-icons" on:click={() => seekForward(-10)}>replay_10</IconButton>
		<div style="display:flex;align-items:center">
			<IconButton class="material-icons" on:click={() => changeSpeed(-1)}>remove</IconButton>
			<div class="mdc-typography--caption" style="width:32px;text-align:center;flex-shrink:0">
				{speeds[speedIndex]}x
			</div>
			<IconButton class="material-icons" on:click={() => changeSpeed(1)}>add</IconButton>
		</div>
		<IconButton class="material-icons" on:click={() => seekForward(10)}>forward_10</IconButton>
		<div class="mdc-typography--caption">{formatTime(currentTime, duration)}</div>
	{:else}
		<div />
		<CircularProgress style="height: 48px; width: 48px;" indeterminate />
		<div />
	{/if}
</div>
<div class="removeMarginTop" />
<div class="progress" class:hidden={!duration} on:click={clickProgress}>
	<LinearProgress progress={currentTime / duration} />
</div>
<div class="removeMarginBottom" />

<style>
	.controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 8px;
	}
	.progress {
		margin: 2px 8px;
		cursor: pointer;
		padding-bottom: 16px;
		padding-top: 8px;
	}
	.removeMarginTop {
		margin-top: -8px;
	}
	.removeMarginBottom {
		margin-top: -12px;
	}
	.hidden {
		visibility: hidden;
	}
</style>
