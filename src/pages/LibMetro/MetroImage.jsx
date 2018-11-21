import React, { Component } from 'react'
import IceContainer from '@icedesign/container'

export default class MetroImage extends Component {
  static displayName = 'MetroImage'

  render() {
    return (
      <IceContainer style={{ width: '100%', height: '100%' }}>
        <p>支持双指/滚动缩放</p>
        <iframe src="http://portal.kandatu.cn/weixin/viewImage/10118" style={{ width: '100%', height: '100%' }} />
      </IceContainer>
    )
  }
}

const styles = {}
