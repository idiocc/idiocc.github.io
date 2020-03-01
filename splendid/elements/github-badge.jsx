/**
 * The server-side rendered _element_.
 * It uses concurrency because each page will have a badge, therefore
 * when they are processed in parallel, we can use a single promise to resolve.
 * @param {Object} param0
 * @param {Splendid} param0.splendid
 * @example
 */
export default async function GitHubBadge({ owner, org, name, splendid, log, logError }) {
  const o = org || owner
  splendid.pretty(false)
  splendid.export({ owner: o, name })
  const { $name, $stars } = splendid.css('styles/github-badge.css', '.GitHubBadge', {
    exported: false, // not required for dynamic rendering in the _component_.
  })
  const n = `${o}/${name}`
  if (!(n in splendid.concurrency)) {
    splendid.concurrency[n] = render(o, name, splendid, { log, logError }, { $name, $stars })
  }
  return splendid.concurrency[n]
}

/**
 *
 * @param {string} owner
 * @param {string} name
 * @param {Splendid} splendid
 * @param {*} param3
 */
const render = async (owner, name, splendid, { log, logError }, { $name, $stars }) => {
  let stargazers_count, description
  const n = `${owner}/${name}`
  if (splendid.env == 'dev') {
    ({ stargazers_count, description } = splendid.getCache('github-badge', n))
  }
  if (!stargazers_count || !description) {
    log('Querying GitHub for stargazers of %s/%s', owner, name)
    const { statusCode, body, statusMessage } =
      await splendid.aqt(`https://api.github.com/repos/${owner}/${name}`)
    if (statusCode != 200) {
      if (body.message && body.documentation_url) {
        throw splendid.newError(`${owner}/${name} ${body.message} ${body.documentation_url}`)
      } else {
        throw splendid.newError(`${statusCode} ${statusMessage}`)
      }
    }
    ({ stargazers_count, description } = body)
    splendid.appendCache('github-badge', { [n]: { stargazers_count, description } })
  }
  const url = `https://github.com/${owner}/${name}`
  return (<a title={description} href={url} className="GitHubBadge">
    <span className={$name}>GitHub</span>
    <span className={$stars} data-stargazers>⭐️ {stargazers_count}</span>
  </a>)
}

/**
 * @typedef {import('splendid')} Splendid
 */