/**
 * React `ref` object.
 * @typedef ReactRefObject
 *
 * @property current - Must be an HTMLElement.
 */
interface ReactRefObject {
  current: HTMLElement | undefined
}

/**
 * Intersection Observer configuratiopn options
 * @typedef IntersectionObserverOptions
 *
 * @property {number} threshold - Number from 0 to 1 of the percent the element needs to intersect to be considered visible. Can provide array of thresholds.
 * @property {Boolean} triggerOnce - If true, check for intersection only once. Will disconnect the IntersectionObserver instance after intersection.
 * @property {HTMLElement} root - Element that is used as the viewport for checking visibility of the provided ref.
 * @property {string} rootMargin - Margin around the root. Can have values similar to the CSS margin property.
 */
interface IntersectionObserverOptions {
  threshold: number
  triggerOnce: boolean
  root: HTMLElement
  rootMargin: string
}

/**
 * Watch for the scrolling intersection of a React or HTMLElement.
 *
 * @param ref - React ref or HTMLElement.
 * @param options - Configuration object to pass to the Intersection Observer.
 * @param callback - Callback to fire when the interseciton happens. Receives the Intersection Observer entry for the provided ref as an argument.
 *
 * @throws if ref is not a valid React ref or HTMLElement.
 *
 * @returns true if the observed element is in view, false otherwise.
 */
export function useIntersectionObserver(
  ref: ReactRefObject | HTMLElement,
  options: IntersectionObserverOptions,
  callback: (entry: IntersectionObserverEntry) => void
): boolean
