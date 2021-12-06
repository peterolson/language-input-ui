import dotenv from 'dotenv';
dotenv.config();

export const MICROSOFT_SPEECH_SUBSCRIPTION_KEY = process.env[
	'MICROSOFT_SPEECH_SUBSCRIPTION_KEY'
] as string;
export const MICROSOFT_SPEECH_ISSUE_TOKEN_ENDPOINT = process.env[
	'MICROSOFT_SPEECH_ISSUE_TOKEN_ENDPOINT'
] as string;
export const MICROSOFT_SPEECH_ISSUE_TOKEN_HOST = process.env[
	'MICROSOFT_SPEECH_ISSUE_TOKEN_HOST'
] as string;

export const MICROSOFT_SPEECH_REGION = process.env['MICROSOFT_SPEECH_REGION'] as string;

export const AWS_ACCESS_KEY_ID = process.env['AWS_ACCESS_KEY_ID'] as string;
export const AWS_SECRET_ACCESS_KEY = process.env['AWS_SECRET_ACCESS_KEY'] as string;
export const AWS_S3_BUCKET = process.env['AWS_S3_BUCKET'] as string;
export const AWS_S3_REGION = process.env['AWS_S3_REGION'] as string;
export const AWS_S3_UPLOAD_ENDPOINT = process.env['AWS_S3_UPLOAD_ENDPOINT'] as string;
export const AWS_S3_HOSTING_ENDPOINT = process.env['AWS_S3_HOSTING_ENDPOINT'] as string;
