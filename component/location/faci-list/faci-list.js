// component/location/faci-list/faci-list.js
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
      title:"安全保障",
      items: [{
        iamge: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_camear%402x.png",
        name: "实时监控",
      }, {
        iamge: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_entranceguard%402x.png",
        name: "门禁",
      }, {
        iamge: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_emergency%402x.png",
        name: "急救包",
      }]
    },{
      title: "儿童友好性",
      items: [{
        iamge: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_floor%402x.png",
        name: "防摔地板",
      }, {
          iamge: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_bar%402x.png",
          name: "安全护栏",
      }, {
          iamge: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_socket%402x.png",
          name: "安全插座",
      },{
          iamge:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_table%402x.png",
          name:"安全桌角",
      }]
    },{
        title:"空气保障",
        items: [{
          iamge: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_aircleaner%402x.png",
          name: "空气净化器",
        }, {
            iamge: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_airsystem%402x.png",
            name: "新风系统",
        }, {
            iamge: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_humidifier%402x.png",
            name: "加湿器",
        }]
    },{
        title:"便捷性",
        items: [{
          iamge: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_wifi%402x.png",
          name: "Wi-Fi",
        }, {
            iamge: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_park%402x.png",
            name: "停车场",
        },]
    }],
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
