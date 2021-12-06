import type { RequestHandler } from '@sveltejs/kit';
import { getSignedURL } from './upload';

export const get: RequestHandler<Locals> = async (req) => {
	const name = req.query.get('name');
	const type = req.query.get('type');
	if (!name || !type) {
		return {
			status: 400,
			body: {
				error: 'Missing name or type'
			}
		};
	}
	return { status: 200, body: await getSignedURL(name, type) };
};
