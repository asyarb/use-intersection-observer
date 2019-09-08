import React, { useRef, useEffect } from 'react'
// import ReactDOM from 'react-dom'
import { useIntersectionObserver } from '../.'

export const Example = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useIntersectionObserver({
    ref,
    callback: () => console.log('I was scrolled to!'),
  })

  useEffect(() => {
    const interval = setTimeout(() => void window.scrollTo(0, 10000), 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div
        style={{
          paddingTop: '100vh',
          backgroundColor: inView ? 'green' : 'red',
        }}
      />
      <div ref={ref}>{inView ? 'scrolled into view' : 'not in view'}</div>
    </div>
  )
}

// ReactDOM.render(<Example />, document.getElementById('root'))
