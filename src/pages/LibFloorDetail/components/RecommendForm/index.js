import React, { Component } from 'react'
import IceContainer from '@icedesign/container'
import { Select, Table } from '@icedesign/base'
import { areas, status, request, formatDate } from '../../../../mixins/utils'

import Img from '@icedesign/img'
import Step from '../../../../components/LibStep'
import InfoDisplay from '../../../../components/InfoDisplay/InfoDisplay'

export default class RecommendForm extends Component {
  static displayName = 'RecommendForm'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      info: [
        {
          props: '房源套数',
          all_value: '',
          none_value: '',
          second_value: ''
        },
        {
          props: '登记人数',
          all_value: '',
          none_value: '',
          second_value: ''
        },
        {
          props: '中签概率',
          all_value: '',
          none_value: '',
          second_value: ''
        }
      ],
      timeInfo: [],
      inSale: true,
      xsfa: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.id)
    this.reqDetail(nextProps.id)
  }

  getIfNotNull(str, suffix) {
    str += ''
    if (str && str.length > 0) {
      if (suffix) {
        str += suffix
      }
      return str
    }
    return '暂无'
  }

  reqDetail(id) {
    var url = `https://www.dapei2.com/api/v1/house/all_detail?id=${id}`
    request(url, (response) => {
      console.log(response.data)
      const { data } = response
      const { info, timeInfo } = this.state
      info[0].all_value = this.getIfNotNull(data.sum, '套')
      info[0].none_value = this.getIfNotNull(data.no_room_sum, '套')
      info[0].second_value = this.getIfNotNull(data.ordinary_number, '套')

      info[1].all_value = this.getIfNotNull(data.sum_person, '户')
      info[1].none_value = this.getIfNotNull(data.register_no_room, '户')
      info[1].second_value = this.getIfNotNull(data.register_room, '户')

      info[2].all_value = this.getIfNotNull(data.all_rate, '%')
      info[2].none_value = this.getIfNotNull(data.first_no_hit_rate, '%(首轮)')
      info[2].second_value = this.getIfNotNull(data.second_no_hit_rate, '%')

      var inSale = false
      if (data.sale_time && data.gs) {
        timeInfo.splice(0, timeInfo.length)
        timeInfo.push({
          time: formatDate(data.sale_time),
          title: '预售时间'
        })
        timeInfo.push({
          time: data.gs,
          title: '预售公示'
        })
        timeInfo.push({
          time: data.dj,
          title: '登记时间'
        })
        timeInfo.push({
          time: data.jy_time,
          title: '核验时间'
        })
        timeInfo.push({
          time: this.getIfNotNull(data.yh),
          title: '摇号时间'
        })
        inSale = true
      }

      const xsfa = this.state.xsfa
      xsfa.splice(0, xsfa.length)
      xsfa.push({
        label: '所属区域',
        value: areas[data.areaId]
      })
      xsfa.push({
        label: '报名时间',
        value: formatDate(data.start_time) + '-' + formatDate(data.end_time)
      })
      xsfa.push({
        label: '摇号时间',
        value: formatDate(data.yaohao_time)
      })
      xsfa.push({
        label: '房源均价',
        value: data.avg_price + (data.renovation ? data.renovation : '')
      })
      xsfa.push({
        label: '主力户型',
        value: data.unit_area
      })
      xsfa.push({
        label: '验资',
        value: data.certify
      })
      xsfa.push({
        label: '登记方式',
        value: data.address
      })

      this.setState({
        data,
        info,
        timeInfo,
        inSale,
        xsfa
      })
    })
  }

  renderInfo = (value, index, record) => {
    return <img src={record.img} style={styles.coverimg} />
  }

  renderStep = () => {
    console.log(this.state.timeInfo)
    if (this.state.inSale) {
      return <Step datas={this.state.timeInfo} style={{ width: '1400px', backgroundColor: '#FF0000' }} />
    }
    return null
  }

  render() {
    const { data, info } = this.state
    return (
      <IceContainer style={styles.container}>
        <div style={styles.title}>
          楼盘详情{data.name ? ' - ' + data.name : ''}
          {data.category_id ? ' - ' + status[data.category_id] : ''}
          <a
            style={{ fontSize: '12px', marginLeft: '20px' }}
            href={`https://3gimg.qq.com/lightmap/v1/marker/index.html?type=0&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp&marker=coord%3A${data.lat}%2C${data.lng}`}
            target="_blank"
          >
            {data.poiaddress}
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Img src={data.img} height={200} />
          <div style={{ display: this.state.inSale ? 'block' : 'none' }}>
            <Step datas={this.state.timeInfo} style={{ width: '1400px', backgroundColor: '#FF0000' }} />
          </div>
          <Table dataSource={info} hasBorder={true} style={styles.table}>
            <Table.Column align="center" title="房源信息" width="25%" dataIndex="props" />
            <Table.Column align="center" title="全部" width="25%" dataIndex="all_value" />
            <Table.Column align="center" title="无房" dataIndex="none_value" width="25%" />
            <Table.Column align="center" title="有房" dataIndex="second_value" width="25%" />
          </Table>
          <InfoDisplay title="销售方案公示" data={this.state.xsfa} style={{ width: '100%' }} />
          <a href={data.gslink} style={{ display: data.gslink ? 'block' : 'none' }} target="_blank">
            查看详细销售方案 >
          </a>
        </div>
      </IceContainer>
    )
  }
}

const styles = {
  title: {
    marginBottom: '30px',
    fontSize: '18px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0,.85)'
  },
  table: {
    width: '97%',
    marginTop: '10px'
  }
}
