/**
 * @type {Object<string, import('splendid').Page>}
 */
const P = {
  index: {
    title: 'Help Center',
    seo: 'Information about how to use MyNewPackage.',
  },
  images: {
    title: 'Images',
    seo: 'Autoprocessing of images eliminates the need to manually prepare graphics.',
  },
}

Object.values(P).forEach((page) => {
  page.layout = '~/help/layout/main.html'
})

export default P