import type { RequestHandler } from '@sveltejs/kit';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { AWS_S3_HOSTING_ENDPOINT } from '../api/config';
import { MICROSOFT_SPEECH_SUBSCRIPTION_KEY, MICROSOFT_SPEECH_REGION } from '../api/config';
import { uploadObject } from '../api/upload';

const subscriptionKey = MICROSOFT_SPEECH_SUBSCRIPTION_KEY;
const serviceRegion = MICROSOFT_SPEECH_REGION;

const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
speechConfig.speechSynthesisOutputFormat =
	sdk.SpeechSynthesisOutputFormat.Audio16Khz64KBitRateMonoMp3;

export const post: RequestHandler<Locals, { ssml: string }> = async (req) => {
	const { ssml } = req.body;
	const outputStream = sdk.AudioOutputStream.createPullStream();
	const audioConfig = sdk.AudioConfig.fromStreamOutput(outputStream);
	const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

	const wordBoundaryEvents: sdk.SpeechSynthesisWordBoundaryEventArgs[] = [];
	synthesizer.wordBoundary = (_sender: unknown, e: sdk.SpeechSynthesisWordBoundaryEventArgs) => {
		wordBoundaryEvents.push(e);
	};

	return new Promise((resolve) => {
		synthesizer.speakSsmlAsync(ssml, async (result) => {
			const textOffset = ssml.split('>').slice(0, 2).join('>').length + 1;
			const timings = wordBoundaryEvents.map((x) => ({
				audioOffset: x.audioOffset / 10000000,
				text: x.text,
				start: x.textOffset - textOffset,
				end: x.textOffset - textOffset + x.wordLength
			}));
			const { audioData } = result;
			const buffer = Buffer.from(audioData);

			const key = `upload/tts_${Date.now()}.mp3`;
			const uploadResult = await uploadObject(key, buffer, 'audio/mp3');
			const url = `${AWS_S3_HOSTING_ENDPOINT}/${uploadResult.Key}`;
			outputStream.close();
			resolve({ status: 200, body: { timings, url } });

			synthesizer.close();
		});
	});
};
