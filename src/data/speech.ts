import type { Voice } from './voices';

/* eslint-disable @typescript-eslint/no-explicit-any */
let expirationTime = 0;
let previousToken: string;
async function getToken() {
	if (!previousToken || +new Date() > expirationTime) {
		const { token, timeToExpire } = await fetch('/speech/token.json').then((x) => x.json());
		previousToken = token;
		expirationTime = +new Date() + timeToExpire;
		return token;
	} else {
		return previousToken;
	}
}

async function loadScript(src: string) {
	const script = document.createElement('script');
	script.src = src;
	script.async = true;
	document.body.appendChild(script);
	await new Promise((resolve) => (script.onload = resolve));
}

declare const SpeechSDK: any;
let isSDKLoaded = false;
async function loadSDK() {
	if (!isSDKLoaded) {
		await loadScript('/microsoft.cognitiveservices.speech.sdk.web.bundle.min.js');
		isSDKLoaded = true;
		return SpeechSDK;
	}
	return SpeechSDK;
}

const region = 'eastus';
export async function getAudio(
	ssml: string
): Promise<{ timings: { audioOffset: number; text: string }; blob: Blob }> {
	const token = await getToken();
	const sdk = await loadSDK();
	const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(token, region);
	const audioConfig = sdk.AudioConfig.fromStreamOutput(new sdk.PushAudioOutputStreamCallback());
	const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

	const wordBoundaryEvents: any = [];
	synthesizer.wordBoundary = (_sender: any, e: any) => {
		wordBoundaryEvents.push(e);
	};

	return new Promise((resolve) => {
		synthesizer.speakSsmlAsync(ssml, (result: { audioData: BlobPart }) => {
			const timings = wordBoundaryEvents.map((x: { audioOffset: number; text: any }) => ({
				audioOffset: x.audioOffset / 10000000,
				text: x.text
			}));
			const blob = new Blob([result.audioData], { type: 'audio/mp3' });
			synthesizer.close();
			resolve({ timings, blob });
		});
	});
}

let audio: any;

const playAudio = (blob: Blob) => {
	const url = window.URL.createObjectURL(blob);
	if (!audio) {
		audio = new Audio(url);
	}
	audio.pause();
	audio.currentTime = 0;
	audio = new Audio();
	audio.src = url;
	audio.play();
};

function getSSML(text: string, voice: Voice) {
	return (
		`<speak version='1.0' xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang='${voice.code}'>` +
		`<voice name='${voice.name}'>` +
		text +
		'</voice>' +
		`</speak>`
	);
}

export async function speak(text: string, voice: Voice) {
	const ssml = getSSML(text, voice);
	const { blob } = await getAudio(ssml);
	playAudio(blob);
}
