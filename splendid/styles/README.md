# Styles

Put any stylesheets in here.

## Combined

The number of stylesheets on the page should be minimal. _Splendid_
uses _Closure Stylesheets_ to minify the CSS and put all stylesheets
together. To enable this option, the `<combine-css>` tag has been
included in the head block.

## Including From Components

Stylesheets can be added from components and elements:

```js
export default function MyComponent({ splendid }) {
  const { $classA, $classB } =
    splendid.css('styles/my-component.css', '.MyComponent', {
      whitelist: [],   // exclude these classes from renaming
      exported: false, // set to true when need to be accessed at run-time
      dynamic: false,  // component will manually load this css file
      link: false,     // include as a link in the head
      inline: false,   // inline on the page
      combined: false, // include in the combined stylesheet
    })
  return (<div className="MyComponent">
    <span className={$classA}>Hello</span>
    <span className={$classB}>World</span>
  </div>)
}
```

The second argument, `rootSelector` will become the root of each rule, so
that there's no need to prepend it manually in the styles. For example,
when the root selector is `.MyComponent`, the style can be:

```css
.MyComponent {
  font-size: larger;
}
span {
  background: green;
}
.classA { font-family: monospace; }
.classB { font-weight: bold; }
```

And it will become:

```css
.MyComponent {
  font-size: larger;
}
.MyComponent span {
  background: green;
}
.MyComponent .classA { font-family: monospace; }
.MyComponent .classB { font-weight: bold; }
```

_Closure Stylesheets_ will rename the classes (except for the root selector)
into something like `.a` and `.b`, to save bytes. Therefore, it is required
to get access to names of those classes via the returned object.