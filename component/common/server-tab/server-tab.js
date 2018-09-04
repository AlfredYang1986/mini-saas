// component/common/server-tab/server-tab.js
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
    list:[{
      img:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A82.png",
      sort:"LEGO",
      head:"Pro.A 初级课程入门",
      cost:"免费",
    }, {
        img: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A81.png",
        sort: "展览",
        head: "STEM Meeting Up",
        cost: "免费",
      }, {
        img: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A81.png",
        sort: "LEGO",
        head: "Pro.A 初级课程入门",
        cost: "免费",
      }, ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reserveDetail: function (event) {
      wx.navigateTo({
        url: '/pages/user/server/acti/acti',
      })
    },
  }
})
