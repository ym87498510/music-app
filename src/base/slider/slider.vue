<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index }"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom.js'
  export default {
    data() {
      return {
        loop: true,
        autoPlay: true,
        interval: 8000,
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      options: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    created() {
      this.loop = this.options.loop || !!this.loop
      this.autoPlay = this.options.autoPlay || !!this.autoPlay
      this.interval = this.options.interval || this.interval
    },
    mounted() {
      this.$nextTick(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      })
      window.addEventListener('resize', () => {
        if (this.slider) {
          this._setSliderWidth(true)
          this.slider.refresh()
        }
      })
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = width + 'px'
        }
        let totalWidth = width * this.children.length
        if (this.loop && !isResize) {
          totalWidth += 2 * width
        }
        this.$refs.sliderGroup.style.width = totalWidth + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true, // 水平滚动
          scrollY: false, // 垂直滚动
          momentum: false, // 惯性
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }, // 轮播属性，非轮播传false
          click: true // 因为fastclick，此处传true才能限制点击
        })
        this.slider.on('scrollEnd', () => {
          // 返回当前是第几个子元素
          let pageIndex = this.slider.getCurrentPage().pageX
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            this._play()
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.interval) // 设置间隔
      }
    },
    destory() {
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
