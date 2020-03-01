export function init(id, key) {
  const el = document.getElementById(id)
  if (!el) {
    console.warn('Parent element for component %s with id %s not found', key, id)
    return {}
  }
  const parent = el.parentElement
  if (!parent) {
    console.warn('Parent of element for component %s with id %s not found', key, id)
    return {}
  }
  return { parent, el  }
}

export function makeIo(options = {}) {
  const { rootMargin = '76px', log = true, ...rest } = options
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      /**
       * @type {_competent.RenderMeta}
       */
      const meta = target.render.meta
      const { key, id, plain } = meta
      if (isIntersecting) {
        if (log)
          console.warn('🏗 Rendering%s component %s into the element %s',
            !plain ? ' Preact' : '', key, id, target)
        try {
          const instance = target.render()
          if (instance && !instance.unrender) io.unobserve(target) // plain
        } catch (err) {
          if (log) console.warn(err)
        }
      } else if (meta.instance) {
        if (log)
          console.warn('💨 Unrendering%s component %s from the element %s',
            !plain ? ' Preact' : '', key, id, target)
        meta.instance.unrender()
      }
    })
  }, { rootMargin, ...rest })
  return io
}

/**
 * @param {_competent.RenderMeta} meta
 * @param {function(new:_competent.PlainComponent, Element, Element)} Comp
 */
export function startPlain(meta, Comp, comp, el, parent, props, children) {
  if (!comp) comp = new Comp(el, parent)
  const r = () => {
    comp.render({ ...props, children })
    meta.instance = comp
  }
  if (Comp.load) { // &!comp
    Comp.load((err, data) => {
      if (data) Object.assign(props, data)
      if (!err) r()
      else console.warn(err)
    }, el, props)
  } else r()
  return comp
}

/**
 * This is the class to provide render and unrender methods via standard API
 * common for Preact and Plain components.
 */
class PreactProxy {
  /**
   * Create a new proxy.
   * @param {Element} el
   * @param {Element} parent
   * @param {*} Comp
   * @param {*} preact
   */
  constructor(el, parent, Comp, preact) {
    this.preact = preact
    this.Comp = Comp
    this.el = el
    this.parent = parent
    /**
     * A Preact instance.
     */
    this.comp = null
    this.unrender = null
  }
  render({ children, ...props }) {
    if (!this.comp) {
      this.preact.render(this.preact.h(this.Comp, props, children), this.parent, this.el)
      const comp = this.el['_component']
      if (comp.componentWillUnmount) {
        this.unrender = () => {
          comp.componentWillUnmount()
        }
      }
      this.comp = comp
    } else {
      if (this.comp.componentDidMount) this.comp.componentDidMount()
      this.comp.forceUpdate()
    }
  }
}

/**
 * @param {_competent.RenderMeta} meta
 */
export function start(meta, Comp, comp, el, parent, props, children, preact) {
  const isPlain = meta.plain
  if (!comp && isPlain) {
    comp = new Comp(el, parent)
  } else if (!comp) {
    comp = new PreactProxy(el, parent, Comp, preact)
  }
  const r = () => {
    comp.render({ ...props, children })
    meta.instance = comp
  }
  if (Comp.load) {
    Comp.load((err, data) => {
      if (data) Object.assign(props, data)
      if (!err) r()
      else console.warn(err)
    }, el, props)
  } else r()
  return comp
}