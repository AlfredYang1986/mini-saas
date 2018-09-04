// component/activities/acti-carousel/acti-carousel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: [
      'https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A81.png',
      'https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A82.png',
      'https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A81.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 500
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
