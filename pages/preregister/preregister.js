// pages/preregister/preregister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexItems: [
      { name: '男生', value: '男生', },
      { name: '女生', value: '女生', },
    ],
    relaItems: [
      { name: '妈妈', value: '妈妈', },
      { name: '爸爸', value: '爸爸', },
      { name: '其他', value: '其他' },
    ],
  },

  bindKeyInput: function (e) {
    let nickname = e.detail.value;
    console.log(nickname)
  },

  sexChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    // guardian_role = e.detail.value

  },

  relaChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    // guardian_role = e.detail.value

  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    let dob = new Date(e.detail.value).getTime();
    console.log(dob)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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