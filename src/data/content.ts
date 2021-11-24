import { endpoint } from './endpoint';

export async function viewContent(id: string) {
	return await fetch(`${endpoint}/content/view?id=${id}`, { method: 'POST' }).then((r) => r.json());
}

export async function rateContent(id: string, rating: 'like' | 'dislike' | 'neutral') {
	return await fetch(`${endpoint}/content/${rating}?id=${id}`, { method: 'POST' }).then((r) =>
		r.json()
	);
}
