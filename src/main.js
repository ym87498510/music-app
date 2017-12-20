import 'common/stylus/index.styl'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})
if (process.env.NODE_ENV === 'test') {
  let VConsole = require('vconsole')
  /* eslint-disable no-new */
  new VConsole()
}
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
