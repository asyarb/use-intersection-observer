/**
 * React `ref` object.
 */
declare interface ReactRefObject {
  /**
   * Must be an Element.
   */
  current: Element | undefined
}

/**
 * Intersection Observer configuratiopn options
 */
declare interface IntersectionObserverOptions {
  /**
   * Number from 0 to 1 of the percent the element needs to intersect to be considered visible. Can provide array of thresholds.
   */
  threshold: number

  /**
   * If true, check for intersection only once. Will disconnect the IntersectionObserver instance after intersection.
   */
  triggerOnce: boolean

  /**
   * Element that is used as the viewport for checking visibility of the provided ref.
   */
  root: Element

  /**
   * Margin around the root. Can have values similar to the CSS margin property.
   */
  rootMargin: string
}

/**
 * Watch for the scrolling intersection of a React or Element.
 *
 * @param ref - React ref or Element.
 * @param options - Configuration object to pass to the Intersection Observer.
 * @param callback - Callback to fire when the interseciton happens. Receives the Intersection Observer entry for the provided ref as an argument.
 *
 * @throws if ref is not a valid React ref or Element.
 *
 * @returns true if the observed element is in view, false otherwise.
 */
export function useIntersectionObserver(
  ref: ReactRefObject | Element,
  options: IntersectionObserverOptions,
  callback: (entry: IntersectionObserverEntry) => void
): boolean
