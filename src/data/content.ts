import { endpoint } from './endpoint';

export async function getContent(id: string) {
	const response = await fetch(`${endpoint}/content?id_${id}`);
	return await response.json();
}
