import { useEffect, useState } from 'react'

const IS_BROWSER = typeof window !== 'undefined'

export const useIntersectionObserver = (ref, fn) => {
  const [inView, setInView] = useState(false)

  const handleIntersect = entries => {
    const [entry] = entries

    if (fn) fn(entry)

    setInView(true)
  }

  const [intersectObs] = useState(() =>
    IS_BROWSER ? new IntersectionObserver(handleIntersect) : null
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
