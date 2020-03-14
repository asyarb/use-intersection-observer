# use-intersection-observer <!-- omit in toc -->

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Provide a `ref` from `useRef`](#provide-a-ref-from-useref)
  - [Provide a DOM element](#provide-a-dom-element)
- [API](#api)
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

- **Hooks API** - Provide a ref!
- **Alternative Native-esque API** - Pass an `HTMLElement` and an optional
  function to handle `IntersectionObserver` callbacks.
- **Isolated** - Intersections will not cause other observed elements to
  re-render.
- **Typed** - Written with TypeScript!

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
  const inView = useIntersectionObserver({
    ref,
    options: {
      threshold: 0.25,
      triggerOnce: true,
    },
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
any side effect on intersection. This function receives list of
`IntersectionObserver` entries (`IntersectionObserverEntry[]`) array as an
argument.

```jsx
const Example = () => {
  const ref = useRef()

  // Pass an optional callback to perform side effects instead:
  useIntersectionObserver({
    ref,
    callback: entries => entries.forEach(e => console.log(e)),
  })

  return <div ref={ref}>Some content...</div>
}
```

### Provide a DOM element

`useIntersectionObserver` can alternatively take an `Element` such as the return
value from `document.querySelector()`.

```jsx
const element = document.querySelector('.someClass')

const Example = () => {
  // Pass an HTMLElement directly:
  const inView = useIntersectionObserver({ element })

  return <div>Some content...</div>
}
```

Just like the `ref` examples, you can optionally provide a callback function.

## API

| Argument   | Description                                                                                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `ref`      | React `ref` to observe.                                                                                                                  |
| `element`  | Alternative HTML `Element` to observe. If both `element` and `ref` are defined, `ref` is prioritized.                                    |
| `options`  | `IntersectionObserverOptions` object with an additional `triggerOnce` argument.                                                          |
| `callback` | Optional callback to fire on intersection. Receives the array of `IntersectionObserverEntry` objects for the provided `ref` or `element` |

## Why use this over `react-intersection-observer`

This package aims to prioritize performance for different use-cases.

`react-intersection-observer` utilizes a single `IntersectionObserver` instance
to observe all elements that use the `useInView` hook. By doing so, browsers can
batch `IntersectionObserver` callbacks together.

Conversely, this will cause any observered element's intersection to cause cause
_all_ observered components to re-render, not just itself. Even when using the
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
animations), consider using this package.

If callbacks are your most expensive operation during intersection,
`react-intersection-observer` may be a better fit.

As always, try both and see what works best for your application.

## License

MIT.
