<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import ListView from 'base/listview/listview'
  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then(res => {
          if (res.code === ERR_OK) {
            this.singers = this._normallizeSinger(res.data.list)
          }
        })
      },
      _normallizeSinger(list) {
        let map = {
          hot: {
            title: '热门',
            items: []
          }
        }
        list.forEach((item, index) => {
          let singer = {
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
          }
          if (index < 10) {
            map.hot.items.push(singer)
          }
          let key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(singer)
        })
        let hot = []
        let num = []
        let letter = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            letter.push(val)
          } else if (val.title.match(/\d/)) {
            num.push(val)
          } else {
            hot.push(val)
          }
        }
        letter.sort((a, b) => {
          // charCodeAt(0) 返回首字母的 Unicode 编码
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        num.sort((a, b) => {
          return a - b
        })
        return hot.concat(num, letter)
      }
    },
    components: {
      ListView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
