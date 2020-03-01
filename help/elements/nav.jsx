/**
 * @param {Object} props
 * @param {import('splendid')} props.splendid
 */
export default function Nav({ splendid }) {
  const { pages, page: { key } } = splendid
  const helpPages = pages.filter(({ dir }) => {
    return dir == 'help'
  })
  return (<ul>
    {helpPages.map(({
      title, menu = title, url, menuUrl = url, file, key: k,
    }) => {
      const active = k == key
      return (<li className={active ? 'Active' : ''}>
        <a data-file={file} href={menuUrl}>{menu}</a>
      </li>)
    }
    )}
  </ul>)
}