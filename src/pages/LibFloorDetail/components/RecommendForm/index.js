import React, { Component } from 'react'
import IceContainer from '@icedesign/container'
import { Select, Table } from '@icedesign/base'
import { request, formatDate } from '../../../../mixins/utils'
import Img from '@icedesign/img'
import Step from '../LibStep'

const { Option } = Select

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
      inSale: true
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
      info[2].none_value = this.getIfNotNull(data.first_no_hit_rate, '%')
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

      this.setState({
        data,
        info,
        timeInfo,
        inSale
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
        <div style={styles.title}>楼盘详情 - {data.name}</div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Img src={data.img} height={200} />
          <Table dataSource={info} hasBorder={true} style={styles.table}>
            <Table.Column align="center" title="房源信息" width={100} dataIndex="props" />
            <Table.Column align="center" title="全部" width={100} dataIndex="all_value" />
            <Table.Column align="center" title="无房" dataIndex="none_value" width={100} />
            <Table.Column align="center" title="有房" dataIndex="second_value" width={100} />
          </Table>

          <div style={{ display: this.state.inSale ? 'block' : 'none' }}>
            <Step datas={this.state.timeInfo} style={{ width: '1400px', backgroundColor: '#FF0000' }} />
          </div>
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
    width: '420px',
    marginTop: '10px'
  }
}
