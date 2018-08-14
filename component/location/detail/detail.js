// component/location-banner/location-detail/location-detail.js
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
    name:"PROGWARTS-科学空间 青年路站",
		address: "青年路甘露园中街天鹅湾南区底商雅成三里2号楼107室",
		description: "距地铁6号线潞城站B口步行500m",
		parking: "免费停车",
		facilities: [
			{
				image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/air.png",
				name: "新风系统"
			},
			{
				image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/watching.png",
				name: "实时监控"
			},
			{
				image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/airconditioner.png",
				name: "空气净化器"
			},
			{
				image: "",
				name: "哎呦我去"
			},
		]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showLocationList: function (event) {
      wx.navigateTo({
        url: '/pages/locations/lst/lst'
      })
    }
  }
})
