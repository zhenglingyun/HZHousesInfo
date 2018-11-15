import axios from 'axios'

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

export { request, formatDate }
