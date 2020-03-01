# Components

Component are rendered in the browser, as well as server-side.
They can be either _Plain_ or _Preact_. Plain components need
to be implemented as a class with a
`static get plain() { return true }` option. Preact components
are more complex and use the power of virtual DOM for dynamic
rendering.

Each component will be rendered only when its parent element is
scrolled into view. This is achieved using _IntersectionObserver_.
They can also be unrendered when the user finished viewing them,
if they provide either `unrender` (for plain) and
`componentWillUnmount` implementations.

- `componentWillUnmount` is not truly unmount because that would
require removing the element from DOM, therefore the components
should just maintain a state property that would disable listeners
without removing the element on which they mounted.

See more `README` in elements.
