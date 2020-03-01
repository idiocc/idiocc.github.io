# Elements

The elements are static components that are only rendered
server-side. They are not exported, and do not have a state.
Elements are useful to create blocks that are repeated
throughout the website, or have to use some _JS_ to generate
some complex layouts.

Elements have access to the `splendid` property that is
used to access the _Splendid_ API. Developer hints to the
API are enabled by importing the Splendid class, and referencing
in the JSDoc of a component:

```js
/**
 * @param {Object} props
 * @param {Splendid} props.splendid
 */
export default function Pages({ splendid }) {
}
/**
 * @typedef {import('splendid')} Splendid
 */
 ```

We've included 2 examples of elements:

* `pages` - the menu that is auto-generated based on the `pages`
property of _Splendid_ that contains all pages, as well as the
active `page` property.
* `github-badge` - the server-side rendered element that fetches
external data from _GitHub_. It also has the **component** counter-
part in the `components` folder, which will update the count of
stars using JavaScript in the browser.

## web-components.json

The `web-components.json` file contains the description of components
for the `customData` feature of `.vscode/settings.json` file. They
will allow auto-completions in tag names and their attributes. When
changes are made to the components, _VSCode_ needs to be restarted.