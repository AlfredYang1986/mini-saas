// component/activity-banner/activity-banner.js
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
		activities: [
			{
				category: "编程",
				title: "ZHANGLU",
				time: "16",
				district: "this is",
				image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/someclassdemo.png",
				price: 134
			},
			{
				category: "编程",
				title: "嘀嗒杯科学魔方小组赛",
				time: "25",
				district: "海淀区",
				image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/someclassdemo.png",
				price: 154
			},
			{
				category: "编程",
				title: "嘀嗒杯科学魔方小组赛",
				time: "28日",
				district: "东城区",
				image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/someclassdemo.png",
				price: 154
			}
		]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showActiDetail: function(event) {
      wx.navigateTo({
        url: '/pages/activity/detail/detail'
      })
    }
  }
})
