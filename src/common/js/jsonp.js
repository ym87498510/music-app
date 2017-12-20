import originJsonp from 'jsonp'

// 将参数用'&'链接
const param = data => {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // 去除第一个'&'
  return url ? url.substring(1) : ''
}

const jsonp = (url, data, option) => {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export default jsonp
