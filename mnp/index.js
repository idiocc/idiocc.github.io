import { parse } from 'url'
import fonts from './fonts'
import installPotrace from './potrace'
import help from './help'

const font = fonts[Math.floor(Math.random() * fonts.length)]

export default {
  mnpQuestions: ['license', 'keywords'],
  questions: {
    'URL': {
      getDefault ({ org, name }) {
        return `https://${org}.github.io/${name}/`
      },
      alias: 'https://mnpjs.github.io/splendid/',
      async afterQuestions({ writeFileSync }, url, { org, name }) {
        const def = `https://${org}.github.io/${name}/`
        if (url == def) return
        const { host } = parse(url)
        writeFileSync('docs/CNAME', host)
      },
    },
    keepHelp: help,
  },
  async afterInit({ org, name, URL, keepHelp }, api) {
    const { updateFiles, github, loading, renameFile, initManager, warn } = api

    await initManager()

    await updateFiles({
      re: /Lobster/g, // {{ font }}
      replacement() {
        this.debug('Setting font in %s', this.path)
        return font
      },
    }, { extensions: ['html', 'css'] })
    await loading('Setting GitHub homepage', github.repos.edit(org, name, {
      homepage: URL,
    }))
    renameFile('docs/.index.html', 'docs/index.html')
    await loading('Enabling Pages on docs', github.pages.enable(org, name))

    const { pathname } = parse(URL)
    await updateFiles([{
      re: /mount: '\/splendid',/g,
      replacement() {
        if (pathname == '/') return `/* mount: '${pathname}', */`
        return `mount: '${pathname}',`
      },
    },
    ], { file: 'splendid/index.js' })
    await updateFiles([{
      // re: /\/\/start mount\s+mount: '\/{{ name }}', \/\/ end mount/,
      re: /mount: '\/splendid\/', /g,
      replacement() {
        if (pathname == '/') return ''
        return `mount: '${pathname}', `
      },
    },
    ], { files: [
      'splendid/comps/index.js',
      ...(keepHelp ? ['splendid/comps/help/images.js'] : []),
    ] })
    await installPotrace(api)
    await loading('Fetching splash', splash(api))
    try {
      const sitemap = joinURL(URL, 'sitemap.xml')
      await loading('Adding Webmaster Console ping webhook', github._request({
        method: 'POST',
        endpoint: `/repos/${org}/${name}/hooks`,
        data: {
          config: {
            url: `http://www.google.com/ping?sitemap=${sitemap}`,
          },
          events: ['page_build'],
        },
      }))
    } catch (err) {
      warn(err.message)
    }
  },
}

const joinURL = (part, ...args) => {
  return args.reduce((acc, current) => {
    const a = acc.replace(/\/$/, '')
    const c = current.replace(/^\//, '')
    acc = `${a}/${c}`
    return acc
  }, part)
}

const splash = async ({ download, writeFileSync }) => {
  const photo = await download('https://source.unsplash.com/collection/923267/600x400')
  writeFileSync('splendid/img/splash.jpg', photo)
}