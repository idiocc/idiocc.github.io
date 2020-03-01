export default () => {
  /* eslint-env browser */
  const iframe = document.querySelector('iframe[title="element-height-observer-iframe"]')
  if (!iframe) return
  const element = iframe.parentElement
  const forceIFrame = false

  if (!forceIFrame && 'ResizeObserver' in window) {
    const listener = iframe['_listener']
    iframe.contentWindow.removeEventListener('resize', listener)
    const ro = new ResizeObserver(listener)
    ro.observe(element)
    // if we remove the iframe, the layout will be reflowed, so just keep it
    // element.removeChild(iframe)
  }
}