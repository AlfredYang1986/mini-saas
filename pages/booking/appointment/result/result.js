// pages/booking/appointment/result/result.js

let OSS = require('../../../../models/ali-oss.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reservable: null,
    infoTitle: "乐高机器人搭建课",
    infoTime: "2018-03-08 周六",
    listTitle: "PRO科学空间 五道口校区",
    listAddress: "海淀区成府路121-3 华清大厦A座 1106",
    mapIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_map%402x.png",
    noteIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_warning_border%402x.png",
    callIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_call%402x.png",
    successIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_success.png",
    android: false,
    iosX: false,
    deviceHeight: getApp().globalData.deviceHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var lm = require('../../../../models/bm_applyee_schema.js');
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
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var date = new Date(res.except_time);
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var week = date.getDay();
        function addZero(m) {
          return m < 10 ? '0' + m : m;
        }
        res.dealdate = year + seperator1 + addZero(month) + seperator1 + (strDate) + ' ' + weekDay[week];
        that.setData({
          reservable: res
        })

      },
      onFail: function (err) {
        console.log(err)
      }
    }
    var bmactv = require('../../../../models/bm_apply_schema.js')
    bmactv.queryApplyInfo(options.reservableid, callback)
    that.setData({
      bar: wx.getStorageSync('mername'),
      android: getApp().globalData.android,
      iosX: getApp().globalData.iosX,
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