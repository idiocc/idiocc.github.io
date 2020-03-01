/**
 * @param {Object} props
 * @param {Splendid} props.splendid
 * @param {string} [dir] Pages from this directory only.
 * @param {boolean} [indexes] Print links that are indexes of dirs only.
 */
export default function Pages({ splendid, dir, indexes,
  'include-dir-index': includeDirIndex = false }) {
  const { pages, page: { key } } = splendid
  const menuPages = pages.filter(({ dir: d, index }) => {
    if (indexes) {
      return d && index
    }
    if (dir) {
      if (index && !includeDirIndex) return false
      return d == dir
    }
    if (!d) return true
  })
  const ajax = (<ul>
    {menuPages.map(({
      title, menu = title, url, menuUrl = url, file, key: k,
    }) => {
      const active = k == key
      return (<li className={active ? 'Active' : ''}>
        <a data-file={file} href={menuUrl}>{menu}</a>
      </li>)
    }
    )}
  </ul>)
  return ajax
}

/**
 * @typedef {import('splendid')} Splendid
 */