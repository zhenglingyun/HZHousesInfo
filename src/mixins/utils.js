import axios from 'axios'

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

function request(url, callback) {
  axios({
    baseURL: `https://bird.ioliu.cn/v1/?url=${url}`
  }).then(callback)
}

function formatDate(shijianchuo) {
  //shijianchuo是整数，否则要parseInt转换
  if (typeof shijianchuo !== 'number') {
    shijianchuo = parseInt(shijianchuo)
  }
  var time = new Date(shijianchuo)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  return y + '-' + add0(m) + '-' + add0(d) //  + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
}

function add0(m) {
  return m < 10 ? '0' + m : m
}

export { areas, status, request, formatDate }
