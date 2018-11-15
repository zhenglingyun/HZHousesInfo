/* eslint react/no-string-refs:0 */
import React, { Component } from 'react'
import IceContainer from '@icedesign/container'
import LibTable from './LibTable'

export default class DonationForm extends Component {
  static displayName = 'DonationForm'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <IceContainer style={styles.container}>
        <div style={styles.title}>全部楼盘</div>
        <LibTable />
      </IceContainer>
    )
  }
}

const styles = {
  title: {
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0,.85)'
  }
}
