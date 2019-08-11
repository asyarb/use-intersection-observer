# use-intersection-observer <!-- omit in toc -->

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Provide a `ref` from `useRef`](#provide-a-ref-from-useref)
  - [Provide a DOM element](#provide-a-dom-element)
- [Why use this over `react-intersection-observer`](#why-use-this-over-react-intersection-observer)
  - [Summary](#summary)
- [License](#license)

[![NPM](https://img.shields.io/npm/v/@asyarb/use-intersection-observer.svg?&color=green)](https://www.npmjs.com/package/@asyarb/use-intersection-observer)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@asyarb/use-intersection-observer.svg?logoColor=brightgreen)

React implementation of the
[intersection Observer Interface](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
to tell you when an element is visible in the viewport.

**Demo**: TODO [Code Sandbox](https://codesandbox.io/)

## Features

- **Hooks API** - Just pass a ref!
- **Alternative Native-esque API** - Pass an `HTMLElement` and an optional
  function to handle `IntersectionObserver` callbacks.
- **Performant** - Intersections will not cause other observed elements to
  re-render.

## Installation

Run the following:

```bash
# Yarn
yarn add @asyarb/use-intersection-observer

# NPM
npm i @asyarb/use-intersection-observer --save
```

## Usage

### Provide a `ref` from `useRef`

To observe the visibility of a component, pass a `ref` of that component to
`useIntersectionObserver`:

```jsx
const Example = () => {
  const ref = useRef()

  // Get the visibility boolean directly from the hook:
  const inView = useIntersectionObserver(ref, {
    threshold: 0.25,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      // => Perform any side effect with it!
    }
  }, [inView])

  return <div ref={ref}>Some content...</div>
}
```

`inView` will be updated whenever the observed element passes the specified
threshold.

Optionally, you can pass a callback function as the third parameter to perform
any side effect on intersection. This function receives the
`IntersectionObserver` entry (`IntersectionObserverEntry`) object as an
argument.

```jsx
const Example = () => {
  const ref = useRef

  // Pass an optional callback to perform side effects instead:
  useIntersectionObserver(ref, { threshold: 0.25, triggerOnce: true }, entry =>
    console.log(entry.boundingClientRect)
  )

  return <div ref={ref}>Some content...</div>
}
```

### Provide a DOM element

`useIntersectionObserver` can alternatively take an `HTMLElement` such as the
return value from `document.querySelector()`.

```jsx
const Example = () => {
  const domNode = document.querySelector('.someClass')

  // Pass an HTMLElement directly:
  const inView = useIntersectionObserver(domNode)

  return <div>Some content...</div>
}
```

Just like the `ref` examples, you can optionally provide a callback function.

## Why use this over `react-intersection-observer`

This package aims to prioritize performance for different use-cases.

`react-intersection-observer` utilizes a single `IntersectionObserver` instance
to observe all elements that use the `useInView` hook. It fires the This is good
because doing so allows browsers to batch `IntersectionObserver` callbacks
together.

Conversely, this is not good because any intersection will cause _all_
observered components to re-render, not just itself. Even when using the
`triggerOnce` flag, components will still re-render post-intersection due to
callbacks still firing from a unified instance.

This package creates an `IntersectionObserver` instance for each unique
component that consumes the hook. This prevents the aforementioned issues at the
cost of additional overhead of creating an instance per element and losing
batched callbacks. This is remedied a bit by the `triggerOnce` flag as we can
disconnect instances entirely after intersection.

### Summary

If re-rendering your observered components are your most expensive operation, or
you just can't have re-rendering from other elements coming into view (e.g.
animations), consider using this package instead.

If callbacks are your most expensive operation during intersection,
`react-intersection-observer` may be a better fit.

## License

MIT.
