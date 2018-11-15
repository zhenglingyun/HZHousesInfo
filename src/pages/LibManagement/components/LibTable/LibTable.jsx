import React, { Component } from 'react'
import { Table, Pagination } from '@icedesign/base'
import LibTableFilter from './LibTableFilter'
import { request, formatDate } from '../../../../mixins/utils'
import { Loading } from '@icedesign/base'
import { Link } from 'react-router-dom'

const areas = {
  '0': '全部区域',
  '1': '上城区',
  '2': '下城区',
  '3': '江干区',
  '4': '拱墅区',
  '5': '西湖区',
  '6': '滨江区',
  '7': '萧山区',
  '8': '余杭区',
  '9': '富阳区',
  '10': '临安区',
  '11': '建德市',
  '12': '淳安县',
  '13': '大江东'
}

const status = {
  '1': '全部楼盘',
  '2': '即将拿证',
  '3': '正在公示',
  '4': '正在登记',
  '5': '即将摇号',
  '6': '已摇号'
}

const pageSize = 10

export default class LibTable extends Component {
  static displayName = 'LibTable'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      currentStausId: '1',
      currentAreaId: '0',
      dataSource: [],
      showLoading: false,
      currentPage: 1,
      totalPage: 0
    }
  }

  componentDidMount() {
    this.reqDataList()
  }

  reqDataList() {
    this.setState({
      showLoading: true
    })
    var url = `https://www.dapei2.com/api/v1/house/area_status?id=${this.state.currentStausId}&areaId=${this.state.currentAreaId}&page=${this.state.currentPage}&size=${pageSize}`
    request(url, (response) => {
      console.log(response)
      if (response && response.data && response.data.data && response.data.data.data) {
        this.state.dataSource.splice(0, this.state.dataSource.length)
        this.state.dataSource = this.state.dataSource.concat(response.data.data.data)
        this.setState({
          dataSource: this.state.dataSource,
          currentPage: response.data.data.current_page,
          totalPage: response.data.data.total
        })
      }
      this.setState({
        showLoading: false
      })
    })
  }

  handlePaginationChange = (currentPage) => {
    this.setState(
      {
        currentPage
      },
      () => {
        this.reqDataList()
      }
    )
  }

  onFilterChange = (value) => {
    if (value) {
      console.log(value)
      var areaId, statusId

      if (value.area) {
        areaId = value.area
      } else {
        areaId = '0'
      }

      if (value.status) {
        statusId = value.status
      } else {
        statusId = '1'
      }

      this.state.currentAreaId = areaId
      this.state.currentStausId = statusId
      this.state.currentPage = 1

      this.reqDataList()
    }
  }

  renderOper = (value, index, record) => {
    return (
      <div>
        <Link to={`/detail?id=${record.id}`}>
          <p style={{ ...styles.button, ...styles.detailButton }}>查看</p>
        </Link>
      </div>
    )
  }

  renderImage = (value, index, record) => {
    return <img src={record.img} style={styles.coverimg} />
  }

  renderArea = (value, index, record) => {
    return <p>{areas[record.areaId]}</p>
  }

  renderTime = (value, index, record) => {
    const statusId = this.state.currentStausId
    var time = ''
    if (statusId == 1) {
      return <p>{formatDate(parseInt(record.sale_time))}</p>
    }
    return <p>{record.open_time}</p>
  }

  renderStatus = (value, index, record) => {
    return <p>{status[record.category_id]}</p>
  }

  renderPrice = (value, index, record) => {
    if (record.avg_price && record.avg_price.length > 0) {
      return <p>￥{record.avg_price}</p>
    }
    return '暂无'
  }

  render() {
    return (
      <div style={styles.container}>
        <Loading visible={this.state.showLoading} style={{ display: 'block' }} shape="fusion-reactor" color="#52b67b" tip="加载中...">
          <LibTableFilter areas={areas} status={status} onChange={this.onFilterChange} />
          <Table dataSource={this.state.dataSource} hasBorder={false} style={styles.table}>
            <Table.Column cell={this.renderImage} title="缩略图" width={120} dataIndex="img" />
            <Table.Column title="楼盘名称" width={190} dataIndex="name" />
            <Table.Column title="区域" dataIndex="cate" cell={this.renderArea} width={100} />
            <Table.Column title="时间" dataIndex="time" cell={this.renderTime} width={150} />
            <Table.Column title="楼盘状态" dataIndex="category_id" cell={this.renderStatus} />
            <Table.Column title="楼盘均价" dataIndex="authName" cell={this.renderPrice} />
            <Table.Column title="操作" width={100} cell={this.renderOper} />
          </Table>
        </Loading>
        <Pagination style={styles.pagination} pageSize={pageSize} current={this.state.currentPage} total={this.state.totalPage} onChange={this.handlePaginationChange} />
      </div>
    )
  }
}

const styles = {
  table: {
    marginTop: '10px'
  },
  button: {
    display: 'inline-block',
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '4px',
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  detailButton: {
    background: '#41cac0',
    marginRight: '8px'
  },
  publishButton: {
    background: '#58c9f3',
    marginRight: '8px'
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'right'
  },
  coverimg: {
    width: '100px',
    height: '100px'
  }
}
