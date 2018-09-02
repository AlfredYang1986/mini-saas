// component/common/user-info/user-info.js
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
    list:[
      {
      icon:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_myservice%403x.png",
      name:"我的服务",
      enter:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_enter%402x.png"
    },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    mySrever: function(event) {
      wx.navigateTo({
        url: 'pages/server/server',
      })
    }
  }
})
