/**
 * scroll smoothly to a element in the DOM.
 * @param elem element to scroll to
 * @param offset int offset pixels from element (default is 0)
 * @returns promise that gets resolved when scrolling is complete
 */
export function smoothScroll(elem: HTMLDivElement, offset = 0) {
	let lastPosition = -Infinity;
	elem.scrollTo({
		left: offset,
		behavior: 'smooth'
	});

	return new Promise<void>((resolve) => {
		const failed = setTimeout(() => {
			resolve();
			clearInterval(checkIfIsStatic);
		}, 2000);

		const checkIfIsStatic = setInterval(() => {
			const position = elem.scrollLeft;
			if (position === lastPosition) {
				clearTimeout(failed);
				clearInterval(checkIfIsStatic);
				resolve();
			}
			lastPosition = position;
		}, 50);
	});
}
