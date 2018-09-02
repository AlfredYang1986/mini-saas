// component/common/server-list/server-list.js
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
    info:[
      {
      img:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A82.png",
      head:"Pro.A 初级课程入门",
      cost:"￥免费",
      sort:"展览",
      date:"08/12",
      week:"周四",
      local:"朝阳区",
    },
    {
      img: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A81.png",
      head: "STEM Meeting Up",
      cost: "免费",
      sort: "展览",
      date: "08/12",
      week: "周四",
      local: "东城区",
    },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  reserveDetail: function (event) {
    wx.navigateTo({
      url: 'Pages/user/server/reserve/reserve',
    })
  },

})
