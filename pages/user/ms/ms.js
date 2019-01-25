// pages/user/myService/myService.js
var OSS = require('../../../models/ali-oss.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    android: getApp().globalData.android,
    iosX: getApp().globalData.iosX,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
    pageContantHeight: getApp().globalData.pageContantHeight,
    bar: '我的服务'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;

    let lm = require('../../../models/bm_applyee_schema.js');
    let bmconfig = require('../../../models/bm_config.js')
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
    // let callback = {
    //   onSuccess: function(res) {
    //     res.map((item) => {       
    //       item.Reservable.price = '免费';
    //       let reservableid = item.Reservable.id;
    //       bmconfig.bm_baizao_actvPrice.map((ele) => {
    //         if (reservableid === ele.actvId) {
    //           item.Reservable.price = ele.price;
    //         }
    //       })
    //     })
    //     that.setData({
    //       list: res
    //     })
    //   },
    //   onFail: function() {
    //     // TODO : 报错 ...
    //   }
    // }
    let store = require('../../../models/bm-data.js').store,
      bmapply = require('../../../models/bm_apply_schema.js');
    // store.Query('applies', 'applicant-id=' + wx.getStorageSync('dd_id')).then(res => {
    //   console.log(res);
    //   that.setData({
    //     list: res
    //   })
    // })
    // bmapply.queryMultiObjects(callback)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})