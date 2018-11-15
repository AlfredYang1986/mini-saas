// pages/brand/brand.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand:{
      logobg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/logo_bg.png",
      logourl:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/logo%403x.png",
    },
    tab:1, 
    exps: null,
    name: "",
  },
  tab_slide: function (e) {//滑动切换tab 
    var that = this;
    that.setData({ tab: e.detail.current });
  },
  tab_click: function (e) {//点击tab切换
    var that = this;
    if (that.data.tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    //获取可视窗口高度
    let callback = {
      onSuccess: function (res) {
        console.log("this is res")
        console.log(res)
        that.setData({
          exps: res
        })
      },
      onFail: function () {
        // TODO : 报错 ...
      }
    }
    var bmexp = require('../../../models/bm_exp_schema.js')
    bmexp.queryMultiExps(callback)
    this.setData({
      exps: null,
      name: "张二呆"
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
  
  },

  showBrandDetail: function (event) {
    wx.navigateTo({
      url: '/pages/brand/details/details'
    })
  },
  showLocations: function (event) {
    wx.navigateTo({
      url: '/pages/locations/details/details'
    })
  },
  brandDetails: function (event) {
    wx:wx.navigateTo({
      url: '/pages/brand/detail/detail'
    })
  }

})