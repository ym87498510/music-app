import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export const getRecommend = () => {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export const getDiscList = () => {
  let url = '/api/getDiscList'
  let data = Object.assign({}, commonParams, {
    platform: 'yqq',
    picmid: 1,
    rnd: Math.random(),
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    format: 'json',
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
