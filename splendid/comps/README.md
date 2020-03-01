# Page Comps

This folder contains the invocations for components on each page.
_Splendid_ generates each file automatically, based on invoked components.

_Preact_ will be added to the page only when there are _Preact_ components.

On development environment, the files are served as modules.

On production, _PageComps_ are compiled using `chunks` functionality on
Closure Compiler. This means that _Splendid_ will statically analyse the
source code to find out every file referenced. Files that are referenced
more that in one _PageComp_ (used on multiple pages), will be placed in
the `common` chunk.

Components are also compiled by dir (groups of pages).