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
