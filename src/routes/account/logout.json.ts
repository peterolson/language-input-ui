import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<Locals, FormData> = async () => {
	return {
		status: 303,
		body: { status: 'ok' },
		headers: {
			'set-cookie': `login_token=; Path=/; HttpOnly`,
			Location: '/?logout=true'
		}
	};
};
