// component/common/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    noback: {
      type: String,
      value: 'false',
    },
    reLaunch: {
      type: Boolean,
      value: false,
      observer: function (news, olds, path) {
        this.setData({
          reLaunch: news
        })
      }
    },
    title: {
      type: String,
      value: '',
      observer: function (news, olds, path) {
        console.log(news)
        this.setData({
          title: news
        })
      }
    },
    bgColor: {
      type: String,
      value: "white"
    },
    color: {
      type: String,
      value: "#000"
    },
    height: {
      type: String,
      value: ""
    },
    // android: {
    //   type: Boolean,
    //   value: false
    // },
    // iosX: {
    //   type: Boolean,
    //   value: false
    // },
  },

  /**
   * 组件的初始数据
   */
  data: {
    backIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_back_dark%402x.png",
    title: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backTo: function () {
      if (this.data.reLaunch) {
        wx.reLaunch({
          url: '/pages/brand/lst/lst'
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
})
