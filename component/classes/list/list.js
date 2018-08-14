// component/class-banner/class-banner.js
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
    classes: [
      {
        category: "编程",
        lecture: "授课方式",
        title: "科学初级课程",
        bundary: "6-12岁",
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/someclassdemo.png",
        price: 134
      },
      {
        category: "编程",
        lecture: "授课方式",
        title: "嘀嗒杯科学中级课程",
        bundary: "6-12岁",
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/someclassdemo.png",
        price: 154
      },
      {
        category: "编程",
        lecture: "授课方式",
        title: "嘀嗒杯科学高级课程",
        bundary: "6-12岁",
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/someclassdemo.png",
        price: 154
      },
      {
        category: "编程",
        lecture: "授课方式",
        title: "嘀嗒杯科学高级课程",
        bundary: "6-12岁",
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/someclassdemo.png",
        price: 154
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
    }
  }
})
