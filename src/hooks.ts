import cookie from 'cookie';
import type { GetSession, Handle } from '@sveltejs/kit';
import { verifyJWT } from './data/jwt';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	const jwt = cookies['login_token'];
	if (jwt) {
		request.locals.user = verifyJWT(jwt);
	}

	const response = await resolve(request);

	return response;
};

export const getSession: GetSession = async (request) => {
	return {
		user: request.locals.user
	};
};
