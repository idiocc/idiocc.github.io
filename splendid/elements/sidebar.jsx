/**
 * A sticky sidebar.
 * @param {Object} p
 * @param {import('splendid')} p.splendid
 */
export default function Sidebar({ children, splendid, class: c, ...props }) {
  const { $SideBarContent } = splendid.css('styles/sidebar.css', '.SideBarMenu', {
    whitelist: ['sidebarshowing'],
  })
  const cn = [c, 'SideBarMenu', 'sidebarshowing'].filter(Boolean).join(' ')
  return (<div {...props} sticky-top className={cn}>
    <div className={$SideBarContent}
      dangerouslySetInnerHTML={{ __html: children }}/>

    <a id="HideMenu" style="color:grey!important;" href="#">hide menu</a>
    <a id="ShowMenu" style="color:grey!important;" href="#">show menu</a>
  </div>)
}


export const init = () => {
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
