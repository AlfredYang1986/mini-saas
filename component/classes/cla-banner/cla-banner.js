// component/classes/cla-banner/cla-banner.js
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
    classInfo:[{
      url:
"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E8%AF%BE%E7%A8%8B%20A%20pic%402x.png",
      sort:"LEGO",
      name:"Pro.A 初级课程入门",
      age:"8-12岁",
      price:"160"
    }, {
        url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E8%AF%BE%E7%A8%8B%20X%20pic%402x.png",
        sort: "LEGO",
        name: "Pro.A 初级课程入门",
        age: "8-12岁",
        price: "160"
      }, {
        url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E8%AF%BE%E7%A8%8B%20B%20pic%402x.png",

        sort: "LEGO",
        name: "Pro.A 初级课程入门",
        age: "8-12岁",
        price: "160"
      }, {
        url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E8%AF%BE%E7%A8%8B%20C%20pic%402x.png",
        sort: "LEGO",
        name: "Pro.A 初级课程入门",
        age: "8-12岁",
        price: "160"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showClasses: function (event) {
      wx.navigateTo({
        url: '/pages/classes/lst/lst'
      })
    },
    showClsDetail: function (event) {
      wx.navigateTo({
        url: '/pages/classes/detail/detail'
      })
    }
  }
})
