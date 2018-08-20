// component/class-banner/class-banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isList: {
      type: String,
      value: 'true',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
		classes: [
			{
				category: "编程",
				lecture: "授课方式",
        title: "Pro.A 初级课程入门",
				bundary: "6-12岁",
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E8%AF%BE%E7%A8%8B%20A%20pic%402x.png",
				price: 134
			},
			{
				category: "编程",
				lecture: "授课方式",
        title: "Pro.A 初级课程入门",
				bundary: "6-12岁",
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E8%AF%BE%E7%A8%8B%20B%20pic%402x.png",
				price: 154
			},
			{
				category: "编程",
				lecture: "授课方式",
        title: "Pro.A 初级课程入门",
				bundary: "6-12岁",
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E8%AF%BE%E7%A8%8B%20C%20pic%402x.png",
				price: 154
			},
      {
        category: "编程",
        lecture: "授课方式",
        title: "Pro.A 初级课程入门",
        bundary: "6-12岁",
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E8%AF%BE%E7%A8%8B%20X%20pic%402x.png",
        price: 154
      }
		]	
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showClasses: function(event) {
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
