<script context="module" lang="ts">
	import { browser } from '$app/env';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		Title,
		CategoryScale
	} from 'chart.js';
	if (browser) {
		Chart.register([LineController, LineElement, PointElement, LinearScale, Title, CategoryScale]);
	}
</script>

<script lang="ts">
	import type { LanguageCode } from '../../types/dictionary.types';
	import type { ChartConfiguration } from 'chart.js';
	import { onDestroy, onMount } from 'svelte';
	import { getProgress } from '../../data/progressData';
	import { t } from '../../i18n/i18n';

	export let language: LanguageCode;
	let canvasNode: HTMLCanvasElement;
	let maxDays: number = 7;
	let progressKey = 'wordsKnown';
	let chart: Chart;

	const formatters: Record<string, (value: number) => string> = {
		timeWatched: (value: number) => {
			if (value < 60) {
				return `${value}${$t('progress.second')}`;
			} else if (value < 3600) {
				return `${Math.floor(value / 60)}${$t('progress.minute')}`;
			} else if (value < 86400) {
				return `${Math.floor(value / 3600)}${$t('progress.hour')}`;
			} else {
				return `${Math.floor(value / 86400)}${$t('progress.day')}`;
			}
		}
	};

	function renderChart(maxDays: number, progressKey: string) {
		canvasNode.width = canvasNode.clientWidth;
		canvasNode.height = canvasNode.clientHeight;
		const { labels, dataPoints } = getProgress(language, progressKey, maxDays > 365 ? 2 : maxDays);
		const data = {
			labels: labels.slice(-maxDays),
			datasets: [
				{
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: dataPoints.slice(-maxDays)
				}
			]
		};
		const config: ChartConfiguration<any> = {
			type: 'line',
			data,
			options: {
				scales: {
					y: {
						ticks: {
							callback: formatters[progressKey]
						}
					}
				}
			}
		};
		if (chart) {
			chart.data = data;
			chart.options = config.options;
			chart.update();
		} else {
			chart = new Chart(canvasNode, config);
		}
	}

	onMount(() => {
		renderChart(maxDays, progressKey);
	});

	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});
</script>

<div>
	<select
		bind:value={maxDays}
		on:change={() => renderChart(maxDays, progressKey)}
		class="mdc-typography--body2"
	>
		<option value={7}>{$t('progress.week')}</option>
		<option value={31}>{$t('progress.month')}</option>
		<option value={365}>{$t('progress.year')}</option>
		<option value={1e10}>{$t('progress.allTime')}</option>
	</select>
	<select
		bind:value={progressKey}
		on:change={() => renderChart(maxDays, progressKey)}
		class="mdc-typography--body2"
	>
		<option value="wordsKnown">{$t('progress.wordsKnown')}</option>
		<option value="wordsRead">{$t('progress.wordsRead')}</option>
		<option value="timeWatched">{$t('progress.timeWatched')}</option>
	</select>
</div>
<canvas bind:this={canvasNode} />

<style>
	div {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	div select {
		margin: 8px;
	}
	canvas {
		width: 100%;
		height: 30vh;
	}
</style>
