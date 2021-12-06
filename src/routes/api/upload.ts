import AWS from 'aws-sdk';
import type { S3 } from 'aws-sdk';
import {
	AWS_ACCESS_KEY_ID,
	AWS_S3_REGION,
	AWS_SECRET_ACCESS_KEY,
	AWS_S3_BUCKET,
	AWS_S3_UPLOAD_ENDPOINT,
	AWS_S3_HOSTING_ENDPOINT
} from './config';

AWS.config.update({
	region: AWS_S3_REGION,
	signatureVersion: 'v4',
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3({
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
	region: AWS_S3_REGION
});

export async function uploadObject(
	fileName: string,
	fileContent: string | Buffer,
	ContentType: string
): Promise<S3.ManagedUpload.SendData> {
	const params = {
		Bucket: AWS_S3_BUCKET,
		Key: fileName,
		Body: fileContent,
		ContentType
	};

	return new Promise((resolve, reject) => {
		s3.upload(params, function (err: Error, data: S3.ManagedUpload.SendData) {
			if (err) {
				console.error(err);
				reject(err);
				return;
			}
			resolve(data);
		});
	});
}

export async function getSignedURL(
	fileName: string,
	contentType: string
): Promise<{ signedURL: string; key: string; endpoint: string }> {
	const key = `upload/${+new Date()}_${fileName}`;
	const params = {
		Bucket: AWS_S3_BUCKET,
		Key: key,
		Expires: 30 * 60, // 30 minutes
		ContentType: contentType
	};
	const options = {
		signatureVersion: 'v4',
		region: AWS_S3_REGION, // same as your bucket
		endpoint: new AWS.Endpoint(AWS_S3_UPLOAD_ENDPOINT),
		useAccelerateEndpoint: true
	};
	const client = new AWS.S3(options);
	const signedURL = (await new Promise((resolve, reject) => {
		client.getSignedUrl('putObject', params, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	})) as string;
	return { signedURL, key, endpoint: AWS_S3_HOSTING_ENDPOINT };
}
