import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useIntersectionObserver } from '../.'

const App = () => {
  const [element, setElement] = useState<Element | null>(null)
  const inView = useIntersectionObserver({
    element,
    callback: () => alert('Scrolled into view'),
  })

  useEffect(() => void setElement(document.querySelector('.hello')), [])

  return (
    <>
      <div
        style={{
          paddingTop: '200vh',
          backgroundColor: inView ? 'green' : 'red',
        }}
      />
      <div className="hello">Testing</div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
