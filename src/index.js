import { useEffect, useState } from 'react'

const IS_BROWSER = typeof window !== 'undefined'

export const useIntersectionObserver = (ref, options, callback) => {
  const [state, setState] = useState([false, undefined])

  const handleIntersect = entries => {
    const [entry] = entries

    if (callback) callback(entry)
    if (options.triggerOnce) intersectObs.disconnect()

    setState([true, entry])
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

  return state
}
