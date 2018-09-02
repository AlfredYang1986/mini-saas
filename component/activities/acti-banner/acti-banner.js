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
    activityInfo:[{
      name:"STEM Meeting Up",
      date:"08/12",
      week:"周四",
      local:"朝阳区",
      price:"134",
      url:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A81.png",
    } 
    , {
        name: "STEM Meeting Up",
        date: "08/12",
        week: "周四",
        local: "东城区",
        price: "134",
        url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A82.png",
      }, {
        name: "STEM Meeting Up",
        date: "08/12",
        week: "周四",
        local: "昌平区",
        price: "134",
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
  }
})
