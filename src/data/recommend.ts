import { cachedData } from './cachedData';

type Recommendations = {
	[id: string]: [number, number]; // weight, lastSeen
};

const maxItems = 250;

const recommendationCache = cachedData<Recommendations>({}, 'recommendations');

function removeOldestRecommendations(recommendations: Recommendations) {
	if (Object.keys(recommendations).length > maxItems) {
		const sorted = Object.keys(recommendations).sort(
			(a, b) => recommendations[a][1] - recommendations[b][1]
		);
		for (let i = 0; i < sorted.length - maxItems; i++) {
			delete recommendations[sorted[i]];
		}
	}
}

export function recommendVideos(videos: { id: string }[], weight = 1): void {
	const recommendations = { ...recommendationCache.value };
	const now = +new Date();
	for (const video of videos) {
		const { id } = video;
		recommendations[id] = [...(recommendations[id] || [0, 0])];
		if (weight > 0) {
			recommendations[id][0] += weight;
		} else {
			recommendations[id][0] = weight;
		}
		recommendations[id][1] = now;
	}
	removeOldestRecommendations(recommendations);
	recommendationCache.update({ ...recommendations });
}

export function ignoreVideos(videos: { id: string }[], weight = 1): void {
	return recommendVideos(videos, -weight);
}

export async function getRecommendationData() {
	const recommendations = await recommendationCache.getValue();
	const recommend = Object.keys(recommendations)
		.filter((id) => recommendations[id][0] > 0)
		.sort((a, b) => recommendations[b][0] - recommendations[a][0]);
	const ignore = Object.keys(recommendations).filter((id) => recommendations[id][0] <= 0);
	return {
		recommend,
		ignore
	};
}
