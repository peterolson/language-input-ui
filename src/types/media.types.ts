export type MediaType = 'youtube' | 'video' | 'audio' | 'none';
export type Media =
	| {
			type: 'youtube';
			youtubeId: string;
	  }
	| {
			type: 'video';
			url: string;
	  }
	| {
			type: 'audio';
			url: string;
	  }
	| {
			type: 'none';
	  };

export type MediaControls = {
	pause: () => void;
	play: () => void;
	seek: (time: number) => void;
	onLoad: (fn: () => void) => void;
	clearListeners: () => void;
};
