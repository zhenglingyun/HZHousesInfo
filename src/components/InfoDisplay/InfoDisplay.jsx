import React, { Component } from 'react'
import { Table } from '@icedesign/base'
import IceContainer from '@icedesign/container'
import './InfoDisplay.scss'

export default class InfoDisplayTable extends Component {
  static displayName = 'InfoDisplayTable'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      title: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        data: nextProps.data
      })
    }
    if (nextProps.title) {
      this.setState({
        title: nextProps.title
      })
    }
  }

  render() {
    return (
      <IceContainer className="info-display-table" style={styles.container}>
        <Table dataSource={this.state.data} style={styles.infoTable}>
          <Table.Column title={this.state.title} dataIndex="label" width="50%" />
          <Table.Column title="" dataIndex="value" width="50%" />
        </Table>
      </IceContainer>
    )
  }
}

const styles = {
  infoTable: {
    width: '100%',
    marginTop: '10px'
  }
}
