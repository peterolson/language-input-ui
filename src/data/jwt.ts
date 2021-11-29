import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const JWT_SECRET = process.env['JWT_SECRET'] as string;

export function createJWT(payload: Locals['user']): string {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '365d' });
}

export function verifyJWT(token: string): Locals['user'] | null {
	try {
		const data = jwt.verify(token, JWT_SECRET) as Locals['user'];
		const now = +new Date() / 1000;
		if (data.exp && now > data.exp) {
			return null;
		}
		return data;
	} catch (e) {
		return null;
	}
}
