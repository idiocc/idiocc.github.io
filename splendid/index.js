/** @type {import('splendid').Config} */
const config = {
  layout: 'splendid/layout/main.html',
  replacements: [
    {
      re: /{{ company }}/g,
      replacement: '[{{ trademark }}]({{ website }})',
    },
  ],
  pages: '../pages',
  elements: ['elements', '../help/elements'],
  blocks: ['blocks', '../help/blocks'],
  // which prefixes to keep in the main CSS
  prefixes: ['-webkit-hyphens', '-ms-hyphens'],
  // for sitemap and social-buttons
  url: 'https://mnpjs.github.io/splendid/',
  // required when pages are at org.github.io/pages-name
  mount: '/splendid',
  potracePath: '~/.splendid/potrace',
}

export default config