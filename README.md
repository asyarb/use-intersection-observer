# use-intersection-observer

[![NPM](https://img.shields.io/npm/v/@asyarb/use-intersection-observer.svg?&color=green)](https://www.npmjs.com/package/@asyarb/use-intersection-observer)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@asyarb/use-intersection-observer.svg?logoColor=brightgreen)

React implementation of the
[intersection Observer Interface](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
to tell you when an element is visible in the viewport.

**Demo**: TODO [Code Sandbox](https://codesandbox.io/)

# Features

- 🎣 **Hooks API** - With `useIntersectionObserver` it's easier than ever to
  monitor the visibility of your components. Just pass a ref!
- ⚙️ **Alternative Native-esque API** - Intuitive to use. Pass an `HTMLElement`
  and an optional function to handle `IntersectionObserver` callbacks.
- 💨 **Optimized Performance** - Reuses `IntersectionObserver` instances
  whenever possible, intersections will not cause other observed elements to
  re-render.
- 💥 **Tiny Footprint** - Less than 400 bytes!

# Installation

Run the following:

```bash
# Yarn
yarn add @asyarb/use-intersection-observer

# NPM
npm i @asyarb/use-intersection-observer --save
```

# Usage

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
  useIntersectionObserver(
    ref,
    { threshold: 0.25, triggerOnce: true },
    entry => {
      console.log(entry.boundingClientRect)
    }
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
  const inView = useIntersectionObserver(domNode, {
    threshold: 0.25,
    triggerOnce: true,
  })

  return <div>Some content...</div>
}
```

Just like with a `ref`, you can optionally provide a callback function.

# License

MIT.
