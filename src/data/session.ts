type Session = {
	user?: {
		username: string;
		id: string;
		authToken: string;
	};
	userData?: Record<string, unknown>;
};
let session: Session = {};
let isSessionReady = false;
let sessionListeners: ((session: Session) => void)[] = [];

export function setSession(s: object) {
	session = s;
	for (const listener of sessionListeners) {
		listener(s);
	}
	sessionListeners = [];
	isSessionReady = true;
}

export function getSession() {
	return session;
}

export function isLoggedIn() {
	return !!session.user;
}

export function onSessionReady(callback: (session: Session) => void) {
	if (isSessionReady) {
		callback(session);
	} else {
		sessionListeners.push(callback);
	}
}
