import __initSidebar from './__init/sidebar'
import __renameMap0 from './__rename-maps/styles/sidebar'
import makeClassGetter from './__mcg'
const renameMaps = { 'styles/sidebar.css': __renameMap0 }
__initSidebar()
import { Component, render, h } from '@externs/preact'
import { makeIo, init, start } from './__competent-lib'
import Ellipsis from '../components/ellipsis.jsx'
import SocialButtons from 'splendid/build/components/social-buttons'

const __components = {
  'ellipsis': Ellipsis,
  'social-buttons': SocialButtons,
}

const io = makeIo()

/** @type {!Array<!preact.PreactProps>} */
const meta = [{
  key: 'social-buttons',
  id: 'cc6e3',
  props: {
    url: 'https://idiocc.github.io',
    meta: true,
    className: 'b-xq b-Hk',
  },
},
{
  key: 'ellipsis',
  id: 'ceb55',
  props: {
    timeout: 300,
  },
  children: ["\n  Please bear one moment while I add the content\n"],
}]
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const Comp = __components[key]
  const plain = Comp.plain || (/^\s*class\s+/.test(Comp.toString()) && !Component.isPrototypeOf(Comp))
  props.splendid = { addCSS(stylesheet) {
    return makeClassGetter(renameMaps[stylesheet])
  } }

  const ids = id.split(',')
  ids.forEach((Id) => {
    const { parent, el } = init(Id, key)
    if (!el) return
    const renderMeta = /** @type {_competent.RenderMeta} */ ({ key, id: Id, plain })
    let comp
    el.render = () => {
      comp = start(renderMeta, Comp, comp, el, parent, props, children, { render, Component, h })
      return comp
    }
    el.render.meta = renderMeta
    io.observe(el)
  })
})
