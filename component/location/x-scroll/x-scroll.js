// component/activities/acti-banner/acti-banner.js
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
    activityInfo: [{
      title: "休息区",
      url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A81.png",
    } , {
      title: "教学区",
      url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A82.png",
    }, {
      title: "教学区",
      url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A82.png",
    }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showActiDetail: function (event) {
      wx.navigateTo({
        url: '/pages/activity/detail/detail'
      })
    },
    showLst: function (event) {
      wx: wx.navigateTo({
        url: '/pages/activity/lst/lst',
      })
    }
  }
})
