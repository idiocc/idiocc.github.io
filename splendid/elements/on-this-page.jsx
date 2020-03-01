/**
 * @type {import('splendid').Element}
 */
export default function OnThisPage({ splendid, 'max-level': maxLevel = 2 }) {
  splendid.polyfill('intersection-observer')
  splendid.css('styles/on-this-page.css', '.OnThisPage', {
    whitelist: 'Active',
  })
  let last = null
  const headings = splendid.headings
    .reduce((acc, heading) => {
      const { level } = heading
      if (level > maxLevel) return acc
      const current = { heading, level, children: [] }
      if (last && last.level < level) {
        last.children.push(current)
      }
      else {
        last = current
        acc.push(current)
      }

      return acc
    }, [])
  const hh = headings.map(({ heading: { title, id }, level, children }) => {
    return (<Li key={id} id={id} title={title} inner={children} level={level}>
    </Li>)
  })
  return (<ul className="OnThisPage">{hh}</ul>)
}

const Li = ({ id, title, inner = [], level }) => {
  return (<li data-heading={id}>
    <a href={`#${id}`} dangerouslySetInnerHTML={{ __html: title }} />
    {Boolean(inner.length) && (<ul>
      {inner.map((i) => <Li id={i.heading.id} title={i.heading.title} inner={i.children} />)}
    </ul>)}
  </li>)
}

export const init = () => {
  /* eslint-env browser */
  const ents = [...document.querySelectorAll('div[data-section]')]

  if (ents.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const section = target.id

        if (isIntersecting) {
          const li = document.querySelector(`[data-heading="${section}"]`)
          li.classList.add('Active')
        } else {
          const li = document.querySelector(`[data-heading="${section}"]`)
          li.classList.remove('Active')
        }
      })
    }, {  })

    ents.forEach((el) => {
      io.observe(el)
    })
  }
}