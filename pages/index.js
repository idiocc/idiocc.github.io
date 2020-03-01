/**
 * @type {import('splendid').Page}
 */
export const index = {
  title: 'MyNewPackage',
  seo: 'The 150-160 characters search engine meta:description',
  og: {
    image: '/img/logo.jpg',
  },
  links: {
    gutenberg: 'https://www.gutenberg.org/files/84/84-h/84-h.htm',
  },
}

// additional directories
// export const dir = '~/dir'

// start help
/**
 * A subdirectory with more pages should be exported as a
 * string constant.
 */
export const help = '~/help'
// end help