import { useEffect, useState } from 'react'

const IS_BROWSER = typeof window !== 'undefined'

export const useIntersectionObserver = (
  ref,
  options = { triggerOnce: true, threshold: 0 },
  callback
) => {
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
