// pages/user/manageChild/manageChild.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
        android: getApp().globalData.android,
        iosX: getApp().globalData.iosX,
        customNavBarHeight: getApp().globalData.customNavBarHeight,
        pageContantHeight: getApp().globalData.pageContantHeight,
        bar: '管理孩子',
        kids: null
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        let that = this,
          ks = require('../../../models/bm_kids_schema.js'),
          kidArray = ks.queryAllLocalKids(),
          store = require('../../../models/bm-data.js').store,
          bmapply = require('../../../models/bm_apply_schema.js');
        this.setData({
          kids: kidArray
        });

        // let callback = {
        //     onSuccess: function (res) {
        //         debugger
        //         console.log(res)
        //     },
        //     onFail: function(err) {
        //       console.log(err)
        //     }
        // }
        store.Query('kids', 'applicant-id=' + wx.getStorageSync('dd_id')).then(result => {
          let tmp = store._bmstore.findAll("kids");
          function filterFunc(tt) {
            return tt["applicant-id"] == wx.getStorageSync('dd_id');
          }
          let res = tmp.filter(filterFunc);
          that.setData({
            kids: res
          })
        })
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
    let that = this,
      store = require('../../../models/bm-data.js').store;

    store.Query('kids', 'applicant-id=' + wx.getStorageSync('dd_id')).then(result => {
      let tmp = store._bmstore.findAll("kids");
      function filterFunc(tt) {
        return tt["applicant-id"] == wx.getStorageSync('dd_id');
      }
      let res = tmp.filter(filterFunc);
      that.setData({
        kids: res
      })
    })
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

  },

  goback: function() {
    wx.switchTab({
      url: '/pages/user/info/info',
    })
  },

  addChild: function() {
    wx.navigateTo({
      url: '/pages/booking/appointment/addkid/addkid?wherefrom=managerkids&candel=0',
    })
  }
})