import type { RequestHandler } from '@sveltejs/kit';
import { createJWT } from '../../data/jwt';
import { endpoint } from '../../data/endpoint';

export const post: RequestHandler<Locals, FormData> = async (request) => {
	const password = request.body.get('password');
	const confirmPassword = request.body.get('confirmPassword');
	const username = request.body.get('username').trim().toLowerCase();

	if (password !== confirmPassword) {
		return {
			status: 303,
			headers: {
				'set-cookie': `login_token=; Path=/; HttpOnly`,
				Location: `/account/create?error=${encodeURIComponent("Passwords don't match.")}`
			}
		};
	}

	const response = await fetch(`${endpoint}/user/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	}).then((x) => x.json());

	if (response.statusCode && response.statusCode !== 200) {
		const error = response.message;
		return {
			status: 303,
			headers: {
				'set-cookie': `login_token=; Path=/; HttpOnly`,
				Location: `/account/create?error=${encodeURIComponent(error)}`
			}
		};
	}

	const { id, createdAt, authToken, isAdmin } = response;

	const jwt = createJWT({ username, id, createdAt, authToken, isAdmin });

	return {
		status: 303,
		headers: {
			'set-cookie': `login_token=${jwt}; Path=/; max-age=31536000; HttpOnly`,
			Location: '/'
		}
	};
};
