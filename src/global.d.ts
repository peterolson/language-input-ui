/// <reference types="@sveltejs/kit" />

interface Locals {
	user: { username: string; id: string; createdAt: Date; authToken: string; exp?: number };
}
