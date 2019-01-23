// pages/booking/appointment/datepicker/datepicker.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 2019; i <= 2100; i++) {
  years.push(i)
}

for (let i = date.getMonth() + 1; i <= 12; i++) {
  months.push(i)
}

for (let i = date.getDate(); i <= 31; i++) {
  days.push(i)
}

let mon = date.getMonth();
let day = date.getDate() - 1;
let reservableid;
let datePicker;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    years,
    year: date.getFullYear(),
    months,
    month: date.getMonth() + 1,
    days,
    day: date.getDate(),
    value: [0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    reservableid = options.reservableid;
    datePicker = new Date().getTime()
    this.setData({
      phone: wx.getStorageSync('dd_phoneno'),
      bar: '选择意向时间',
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

  },

  bindChange(e) {
    const val = e.detail.value
    let dateSelected = this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]];
    datePicker = dateSelected;
    // datePicker = new Date(dateSelected).getTime();
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },

  next() {
    wx.navigateTo({
//      url: '/pages/activity/reserve/reserve?reservableid=' + reservableid + '&datePicker=' + datePicker,
      url: '/pages/booking/appointment/order/order?reservableid=' + reservableid + '&datePicker=' + datePicker,

    })
  }
})