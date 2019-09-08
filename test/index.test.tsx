import React from 'react'
import { render, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'intersection-observer'

// import { useIntersectionObserver } from '../dist'
import { Example } from '../example/'

describe('Intergration example', () => {
  it('renders "not in view" when not scrolled to.', () => {
    const { getByText } = render(<Example />)

    expect(getByText('not in view')).toBeInTheDocument()
  })

  it('matches snapshot when not in view', () => {
    const { container } = render(<Example />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            style="padding-top: 100vh; background-color: red;"
          />
          <div>
            not in view
          </div>
        </div>
      </div>
    `)
  })

  it('renders "scrolled into view" when scrolled to', async () => {
    const { getByText } = render(<Example />)

    await wait(
      () => {
        expect(getByText('scrolled into view')).toBeInTheDocument()
      },
      { interval: 500, timeout: 500 }
    )
  })

  it('matches snapshot when not in view', async () => {
    const { container } = render(<Example />)

    await wait(
      () => {
        expect(container).toMatchInlineSnapshot(`
          <div>
            <div>
              <div
                style="padding-top: 100vh; background-color: red;"
              />
              <div>
                not in view
              </div>
            </div>
          </div>
        `)
      },
      { interval: 500, timeout: 500 }
    )
  })
})
