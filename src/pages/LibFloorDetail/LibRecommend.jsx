import React, { Component } from 'react'
import RecommentFrom from './components/RecommendForm'
import queryString from 'query-string'

export default class RecommendFrom extends Component {
  static displayName = 'RecommendFrom'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      id: 0
    }
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search)
    console.log(params)
    this.setState({
      id: params.id
    })
  }

  render() {
    return (
      <div>
        <RecommentFrom id={this.state.id} />
      </div>
    )
  }
}
