// component/location-banner/location-banner.js
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
		locations: [
			{
				title: "天鹅湾",
				address: "青年路甘露园中街天鹅南区"
			},
			{
				title: "青年路",
				address: "青年路甘露园中街天鹅南区"
			},
			{
				title: "甘露园",
				address: "青年路甘露园中街天鹅南区"
			},
		]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showLocations: function (event) {
      wx.navigateTo({
        url: '/pages/locations/detail/detail'
      })
    }
  }
})
