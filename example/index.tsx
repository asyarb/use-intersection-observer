import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { useIntersectionObserver } from '../src'

export const Example = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useIntersectionObserver({
    ref,
    options: {
      threshold: 0,
      triggerOnce: false,
    },
    callback: console.log,
  })

  return (
    <div>
      <div
        style={{
          paddingTop: '100vh',
          backgroundColor: inView ? 'green' : 'red',
          marginBottom: '500px',
        }}
      />
      <div ref={ref}>{inView ? 'scrolled into view' : 'not in view'}</div>
    </div>
  )
}

ReactDOM.render(<Example />, document.getElementById('root'))
