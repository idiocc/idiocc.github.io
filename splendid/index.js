/** @type {import('splendid').Config} */
const config = {
  output: '.',
  layout: 'splendid/layout/main.html',
  replacements: [
    {
      re: /{{ company }}/g,
      replacement: '[Idio](https://www.idio.cc)',
    },
  ],
  pages: '../pages',
  elements: ['elements'],
  blocks: ['blocks'],
  // which prefixes to keep in the main CSS
  prefixes: ['-webkit-hyphens', '-ms-hyphens'],
  // for sitemap and social-buttons
  url: 'https://idiocc.github.io',
  // required when pages are at org.github.io/pages-name
  /* mount: '/', */
  potracePath: '~/.splendid/potrace',
}

export default config