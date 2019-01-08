// pages/locations/details/details.js

var OSS = require('../../../models/ali-oss.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yard: null,
    title: "PRO科学空间站青年路站",
    address: "朝阳区东直门外大街第三方大厦A座 1101室",
    tag: ["购物中心", "室内"],
    traffic: "距地铁6号线潞城站B口步行500m",
    schoolTags: [{
        img: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_%20certification.jpg",
        name: "儿童适宜标准"  
      },
      {
        img: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_%20certification.jpg",
        name: "儿童适宜标准"
      }
    ],
    facilities: [
      {
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_camear%402x.png",
        name: "实时监控"
      },
      {
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_entranceguard%402x.png",
        name: "门禁"
      },
      {
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_emergency%402x.png",
        name: "急救包"
      },
      {
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_floor%402x.png",
        name: "防摔地板"
      },
      {
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_emergency%402x.png",
        name: "急救包"
      },
      {
        image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_floor%402x.png",
        name: "防摔地板"
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var lm = require('../../../models/bm_applyee_schema.js');
    if (!lm.checkIsLogin()) {
      wx.redirectTo({
        url: '/pages/register/register'
      })
      return
    }
    let client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAINO7wSDoWJRfN',
      accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
      bucket: 'bmsass'
    });
    let that = this
    let callback = {
      onSuccess: function (res) {
        let tagimgs = res.Tagimgs;
        let newimgs = tagimgs.map((ele) => {
          let tagImg = ele.img;
          ele.dealImg = client.signatureUrl(tagImg);
          return ele
        })
        console.log(res)
        that.setData({
          yard: res
        })
      },
      onFail: function () {
        // TODO : 报错 ...
      }
    }
    var bmyard = require('../../../models/bm_yard_schema.js')
    bmyard.queryYard(options.yardid, callback)

    that.setData({
      bar: wx.getStorageSync('mername')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})