export default () => {
  /* eslint-env browser */
  const hm = document.getElementById('HideMenu')
  const sm = document.getElementById('ShowMenu')
  if (hm) {
    hm.onclick = (e) => {
      const target = /** @type {!Element} */ (e.target)
      target.parentElement.classList.remove('sidebarshowing')
      return false
    }
  }
  if (sm) {
    sm.onclick = (e) => {
      const target = /** @type {!Element} */ (e.target)
      target.parentElement.classList.add('sidebarshowing')
      return false
    }
  }
}