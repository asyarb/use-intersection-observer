import { useEffect, useState, MutableRefObject } from 'react'

/**
 * Hook parameters.
 */
interface UseIntersectionObserverProperties {
  /**
   * Ref object from `useRef`.
   */
  ref?: MutableRefObject<Element>

  /**
   * DOM element. E.g. from `querySelector()`
   */
  element?: Element

  /**
   * Configuration options for the intersection observer
   * instance.
   */
  options?: IntersectionObserverOptions

  /**
   * Callback to fire when the observed component or Element
   * comes into view.
   */
  callback?: (entry: IntersectionObserverEntry) => void
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

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (!intersectObs) return

    const [entry] = entries

    if (callback && entry.isIntersecting) callback(entry)
    if (options.triggerOnce && entry.isIntersecting) intersectObs.disconnect()

    setInView(entry.isIntersecting)
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
