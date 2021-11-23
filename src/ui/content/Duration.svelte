<script lang="ts">
	export let duration: number;
	const totalSeconds = duration;
	const totalMinutes = Math.floor(totalSeconds / 60);
	const totalHours = Math.floor(totalMinutes / 60);
	const minutes = Math.floor(totalMinutes - totalHours * 60);
	const seconds = Math.floor(totalSeconds - minutes * 60 - totalHours * 60 * 60);
	function padZero(x: number) {
		return ('00' + x).slice(-2);
	}
	const formattedTime =
		totalHours > 0
			? `${totalHours}:${padZero(minutes)}:${padZero(seconds)}`
			: `${minutes}:${padZero(seconds)}`;
</script>

<div>
	{formattedTime}
</div>

<style>
	div {
		color: white;
		background-color: rgba(0, 0, 0, 0.8);
		display: inline;
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 4px;
		padding: 2px 4px;
		border-radius: 2px;
		letter-spacing: 0.5px;
		font-size: 0.8rem;
		line-height: 1rem;
		font-weight: 500;
		font-family: Roboto, Arial, sans-serif;
	}
</style>
