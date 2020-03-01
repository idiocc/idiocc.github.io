import makeClassGetter from '../__mcg'
const renameMaps = {  }
import { makeIo, init, startPlain } from '../__competent-lib'
import Highlightjs from 'splendid/build/components/highlightjs'

const __components = {
  'highlightjs': Highlightjs,
}

const io = makeIo()

const meta = [{
  key: 'highlightjs',
  id: 'c16f7,c16f71,c16f72,c16f73,c16f74,c16f75,c16f76,c16f77',
  props: {
    lang: 'xml',
  },
}]
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const Comp = __components[key]
  const plain = true
  props.splendid = { mount: '/splendid/', addCSS(stylesheet) {
    return makeClassGetter(renameMaps[stylesheet])
  } }

  const ids = id.split(',')
  ids.forEach((Id) => {
    const { parent, el } = init(Id, key)
    if (!el) return
    const renderMeta = /** @type {_competent.RenderMeta} */ ({ key, id: Id, plain })
    let comp
    el.render = () => {
      comp = startPlain(renderMeta, Comp, comp, el, parent, props, children)
      return comp
    }
    el.render.meta = renderMeta
    io.observe(el)
  })
})
