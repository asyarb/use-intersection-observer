import { useEffect, useState } from 'react'

const IS_BROWSER = typeof window !== 'undefined'

/**
 * Intersection Observer configuration options.
 * @typedef {Object} IntersectionObserverOptions
 * @property {number} threshold - Number from 0 to 1 of the percent the element needs to intersect to be considered visible. Can provide array of thresholds.
 * @property {Boolean} triggerOnce - If true, check for intersection only once. Will disconnect the IntersectionObserver instance after intersection.
 * @property {HTMLElement} root - Element that is used as the viewport for checking visibility of the provided ref.
 * @property {string} rootMargin - Margin around the root. Can have values similar to the CSS margin property.
 */

/**
 * Watch for the scrolling intersection of a React or HTML element.
 *
 * @param {object} ref - React ref or HTMLElement.
 * @param {IntersectionObserverOptions} options - Configuration object to pass to the Intersection Observer
 * @param {Function} callback - Callback to fire when the interseciton happens. Receives the Intersection Observer entry for the provided ref as an argument.
 *
 * @throws if ref is not a valid React ref or HTMLElement.
 */
export const useIntersectionObserver = (ref, options, callback) => {
  const [inView, setInView] = useState(false)

  const handleIntersect = entries => {
    const [entry] = entries

    if (callback && entry.isIntersecting) callback(entry)
    if (options.triggerOnce && entry.isIntersecting) intersectObs.disconnect()

    setInView(entry.isIntersecting)
  }

  const [intersectObs] = useState(() =>
    IS_BROWSER ? new IntersectionObserver(handleIntersect, options) : null
  )

  useEffect(() => {
    if (ref) {
      const domNode = ref.hasOwnProperty('current') ? ref.current : ref
      intersectObs.observe(domNode)
    }

    return () => intersectObs.disconnect()
  }, [ref, intersectObs])

  return inView
}
