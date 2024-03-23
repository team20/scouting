/**
 * Checks if the touch object is within the element's bounds.
 * @param e The touch event containing the touch objects.
 * @returns Whether or not the touch objects are in the element's bounds.
 */
export function isOnElement(e: TouchEvent): boolean {
	return isTouchInBounds(e, (e.target as Element).getBoundingClientRect());
}
/**
 * Checks if the touch object is within the bounds.
 * @param e The touch event containing the touch objects.
 * @param bounds The bounds.
 * @returns Whether or not the touch objects are in the bounds.
 */
export function isTouchInBounds(e: TouchEvent, bounds: DOMRect) {
	return (
		e.changedTouches[0].clientX > bounds.left &&
		e.changedTouches[0].clientX < bounds.right &&
		e.changedTouches[0].clientY > bounds.top &&
		e.changedTouches[0].clientY < bounds.bottom
	);
}
