export function isOnElement(e: TouchEvent): boolean {
	return isTouchInBounds(e, (e.target as Element).getBoundingClientRect());
}
export function isTouchInBounds(e: TouchEvent, bounds: DOMRect) {
	return (
		e.changedTouches[0].clientX > bounds.left &&
		e.changedTouches[0].clientX < bounds.right &&
		e.changedTouches[0].clientY > bounds.top &&
		e.changedTouches[0].clientY < bounds.bottom
	);
}
