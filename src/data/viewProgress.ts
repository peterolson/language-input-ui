import { cachedData } from './cachedData';

export type ViewProgressItem = {
	currentTime: number;
	topTokenIndex: number;
	lookedUpWords: string[];
};
export type ViewProgress = {
	[id: string]: ViewProgressItem;
};

const viewProgressCache = cachedData<ViewProgress>({}, 'viewProgress');
export const viewProgressStore = viewProgressCache.store;

export function addViewProgress(id: string, item: ViewProgressItem) {
	viewProgressCache.update({
		...viewProgressCache.value,
		[id]: item
	});
}

export function removeViewProgress(id: string) {
	const copy = { ...viewProgressCache.value };
	delete copy[id];
	viewProgressCache.update({ ...copy });
}
