import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { useIntersectionObserver } from '../src'

export const Example: React.FC<{ id?: string }> = ({ id }) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useIntersectionObserver({
    ref,
    options: {
      threshold: 1,
      triggerOnce: true,
    },
  })

  return (
    <div
      id={id}
      ref={ref}
      style={{ padding: '3rem', background: inView ? 'lightBlue' : 'green' }}
    >
      {inView ? 'scrolled into view' : 'not in view'}
    </div>
  )
}

const Examples = () => (
  <div style={{ display: 'grid', rowGap: '1rem' }}>
    <div
      style={{
        background: 'pink',
        height: '100vh',
      }}
    />
    {Array.from(Array(100).keys()).map((_i, idx) => (
      <Example key={idx} id={idx.toString()} />
    ))}
    <div
      style={{
        background: 'pink',
        height: '100vh',
      }}
    />
  </div>
)

ReactDOM.render(<Examples />, document.getElementById('root'))
