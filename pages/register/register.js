// pages/info-two/info-two.js 

Page({
  /**
  * 页面的初始数据
  */
  data: {
    modalHidden: true,
    logo: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brands_logo_bzbold%402x.jpg",

    // redir: '/pages/brand/info/info',
    // customid: '',

    isReady: '',
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    console.log('onload register')
    let tmp = options.redir
    console.log('tmp: ', tmp)
    if (tmp) {
      wx.setStorageSync('qr_page', tmp)
    }
    let tid = options.reservableid
    console.log('tid: ', tid)
    if (tid) {
      wx.setStorageSync('qr_page_id', tid)
    }
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