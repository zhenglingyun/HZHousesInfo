/* eslint react/no-string-refs:0 */
import React, { Component } from 'react'
import { Grid, Input, Select } from '@icedesign/base'
import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder } from '@icedesign/form-binder'

const { Row, Col } = Grid
const { Option } = Select

export default class TableHead extends Component {
  static displayName = 'TableHead'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      value: {},
      areas: this.props.areas,
      status: this.props.status,
      onChange: this.props.onChange
    }
    console.log(this.state.areas)
    console.log(this.state.status)
  }

  formChange = (value) => {
    this.state.onChange(value)
    this.setState({
      value
    })
  }

  renderAreaItem = (key) => {
    return <Option value={key}>{this.state.areas[key]}</Option>
  }

  renderStatusItem = (key) => {
    return <Option value={key}>{this.state.status[key]}</Option>
  }

  render() {
    return (
      <IceFormBinderWrapper value={this.state.value} onChange={this.formChange} ref="form">
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>区域：</span>
              <IceFormBinder triggerType="onBlur">
                <Select placeholder="请选择" name="area" size="large" style={{ minWidth: '200px' }}>
                  {Object.keys(this.state.areas).map(this.renderAreaItem)}
                </Select>
              </IceFormBinder>
            </div>
          </Col>

          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>楼盘状态：</span>
              <IceFormBinder triggerType="onBlur">
                <Select placeholder="请选择" name="status" size="large" style={{ minWidth: '200px' }}>
                  {Object.keys(this.state.status).map(this.renderStatusItem)}
                </Select>
              </IceFormBinder>
            </div>
          </Col>
        </Row>
      </IceFormBinderWrapper>
    )
  }
}

const styles = {
  container: {
    margin: '20px',
    padding: '0'
  },
  title: {
    margin: '0',
    padding: '20px',
    fonSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'rgba(0,0,0,.85)',
    fontWeight: '500',
    borderBottom: '1px solid #eee'
  },
  formRow: {
    padding: '10px 20px'
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0'
  },
  formLabel: {
    minWidth: '70px'
  }
}
