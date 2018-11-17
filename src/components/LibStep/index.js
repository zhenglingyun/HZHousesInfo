import React, { Component } from 'react'
import IceContainer from '@icedesign/container'

export default class DataDisplay extends Component {
  static displayName = 'DataDisplay'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      datas: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.datas)
    console.log('xxx')
    if (nextProps.datas) {
      this.setState({
        datas: nextProps.datas
      })
    }
  }

  render() {
    return (
      <div className="data-display">
        <IceContainer>
          <div style={styles.items}>
            {this.state.datas.map((item, index) => {
              return (
                <div style={styles.item} key={index}>
                  <h5 style={styles.count}>{item.time}</h5>
                  <span style={styles.splitLine} />
                  <p style={styles.title}>{item.title}</p>
                </div>
              )
            })}
          </div>
        </IceContainer>
      </div>
    )
  }
}

const styles = {
  items: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    width: '150px',
    margin: '5px 0',
    textAlign: 'center'
  },
  count: {
    margin: '10px 0',
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#15A0FF'
  },
  title: {
    color: '#999'
  },
  splitLine: {
    display: 'block',
    margin: '0 auto',
    width: '24px',
    height: '1px',
    background: '#9B9B9B'
  }
}
