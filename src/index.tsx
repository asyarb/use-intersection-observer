import { useEffect, useState, useRef, RefObject } from 'react'

/**
 * Hook parameters.
 */
interface UseIntersectionObserverProperties {
  /**
   * Ref object from `useRef`.
   */
  ref?: RefObject<Element> | null

  /**
   * DOM element. E.g. from `querySelector()`
   */
  element?: Element | null | undefined

  /**
   * Configuration options for the intersection observer
   * instance.
   */
  options?: IntersectionObserverOptions

  /**
   * Callback to fire when the observed component or Element
   * comes into view.
   */
  callback?: (entries: IntersectionObserverEntry[]) => void
}

/**
 * Intersection Observer configuratiopn options.
 */
interface IntersectionObserverOptions {
  /**
   * If `true`, check for intersection only once. Will
   * disconnect the IntersectionObserver instance after
   * intersection.
   */
  triggerOnce: boolean

  /**
   * Number from 0 to 1 representing the percentage
   * of the element that needs to be visible to be
   * considered as visible. Can also be an array of
   * thresholds.
   */
  threshold: number | number[]

  /**
   * Element that is used as the viewport for checking visibility
   * of the provided `ref` or `element`.
   */
  root?: Element

  /**
   * Margin around the root. Can have values similar to
   * the CSS margin property.
   */
  rootMargin?: string
}

const IS_BROWSER = typeof window !== 'undefined'

/**
 * Watch for the scrolling intersection of a React component or
 * Element.
 *
 * @param hookProperties - Configuration object for this hook.
 *
 * @returns A boolean representing if the observed component
 * or Element is in view.
 */
export const useIntersectionObserver = ({
  ref,
  element,
  options = { triggerOnce: true, threshold: 0 },
  callback,
}: UseIntersectionObserverProperties) => {
  const [inView, setInView] = useState(false)

  // We need to track if the callback has been triggered since the Observer
  // callback will always be immediately invoked on page load.
  // We don't want the immediate invocation to prevent the initial intersection
  // callback, so we need to manually track it ourselves.
  const hasRunCallbackOnceRef = useRef(false)

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (!intersectObs) return

    // Capture the mutable ref for this closure.
    const hasRunCallback = hasRunCallbackOnceRef.current

    // We've already ran the callback and triggerOnce is true, so don't
    // do anything.
    if (hasRunCallback && options.triggerOnce) return

    // Otherwise, we need to see if the element is intersecting and run
    // the user's callback if they have provided one.
    const someElementIsInView = entries.some(e => e.isIntersecting)

    if (someElementIsInView) {
      if (callback) callback(entries)
      hasRunCallbackOnceRef.current = true
    }

    // If triggerOnce is true and we've already ran the callback,
    // disconnect so we don't trigger anymore.
    if (options.triggerOnce && hasRunCallbackOnceRef.current)
      intersectObs.disconnect()

    setInView(someElementIsInView)
  }

  const [intersectObs] = useState(() =>
    IS_BROWSER ? new IntersectionObserver(handleIntersect, options) : undefined
  )

  useEffect(() => {
    if (!intersectObs) return

    let domNode

    if (ref) domNode = ref.current
    else if (element) domNode = element

    if (domNode) intersectObs.observe(domNode)

    return () => intersectObs.disconnect()
  }, [ref, intersectObs, element])

  return inView
}
