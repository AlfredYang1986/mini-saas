// component/location-banner/location-banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isActi: {
      type: String,
      value: 'false',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    locations: [
      {
        title: "PROGWORTS-科学空间 青年路站",
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
    ],
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showmap: function (event) {
      wx.navigateTo({
        url: '/pages/locations/detail/map/map'
      })
    },

    showLocationList: function (event) {
      wx.navigateTo({
        url: '/pages/locations/lst/lst'
      })
    },
  }
})
