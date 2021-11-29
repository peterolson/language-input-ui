import cookie from 'cookie';
import type { GetSession, Handle } from '@sveltejs/kit';
import { verifyJWT } from './data/jwt';
import { endpoint } from './data/endpoint';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	const jwt = cookies['login_token'];
	if (jwt) {
		request.locals.user = verifyJWT(jwt);
		if (request.locals.user) {
			if (!request.locals.userData) {
				const userData = await getUserData(request.locals.user.authToken);
				request.locals.userData = userData;
			}
		}
	}

	const response = await resolve(request);

	return response;
};

export const getSession: GetSession = async (request) => {
	return {
		user: request.locals.user,
		userData: request.locals.userData
	};
};

async function getUserData(authToken: string) {
	return await fetch(`${endpoint}/user/data`, {
		headers: {
			'Content-Type': 'application/json',
			authToken
		}
	}).then((x) => x.json());
}
