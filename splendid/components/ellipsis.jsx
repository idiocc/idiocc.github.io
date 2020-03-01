import { Component } from 'preact'

/**
 * A _Preact_ component that displays loading ... dots animation.
 * It has a `serverRender` method that calls `splendid.export` to
 * make sure this component is present on pages.
 * The other way would be to create an `elements/ellipsis` element
 * and call this function there (elements override components but
 * only for server-side rendering).
 * @example
 */
export default class Ellipsis extends Component {
  constructor() {
    super()
    this.state.showing = false
  }
  serverRender({ splendid, timeout, children }) {
    splendid.export()
    // when need to limit props that reach the browser,
    // splendid.export({ timeout }) can be used.

    return this.render({ timeout, children })
    // just return HTML for placeholder until component
    // is initialised on the page.
  }
  componentDidMount() {
    this.setState({ showing: true })
  }
  /**
   * Called by _Splendid_ when component is scrolled out of view.
   */
  componentWillUnmount() {
    this.setState({ showing: false })
  }
  render({ timeout = 250, children }) {
    return (<span>{children}
      {this.state.showing && <Dots timeout={timeout}/>}
    </span>)
  }
}

class Dots extends Component {
  constructor() {
    super()
    this.state = {
      inc: 0,
    }
    this.int = null
  }
  componentDidMount() {
    this.int = setInterval(() => {
      let inc = this.state.inc + 1
      if (inc > 3) inc = 0
      this.setState({ inc })
    }, this.props.timeout)
  }
  /**
   * This function is called by _Preact_, because the root
   * component changed its state and removed the Dots element.
   */
  componentWillUnmount() {
    clearInterval(this.int)
  }
  render() {
    return (<span>{'.'.repeat(this.state.inc)}</span>)
  }
}
