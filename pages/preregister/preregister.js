// pages/preregister/preregister.js
let contact;
let nowDate;
let child_name;
let gender;
let guardian_role;
let dob;
let kids;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: wx.getStorageSync('dd_phoneno'),
    sexItems: [
      { name: 1, value: '男生', },
      { name: 0, value: '女生', },
    ],
    relaItems: [
      { name: '妈妈', value: '妈妈', },
      { name: '爸爸', value: '爸爸', },
      { name: '其他', value: '其他' },
    ],
    logo: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E9%A2%84%E6%B3%A8%E5%86%8C%E8%A1%A8%E5%8D%95%E9%A1%B5logo%E6%9B%BF%E6%8D%A2.jpg",
  },

  nameInput: function (e) {
    child_name = e.detail.value;
  },

  contactInput: function (e) {
    contact = e.detail.value;
  },

  sexChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    gender = parseInt(e.detail.value)

  },

  relaChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    guardian_role = e.detail.value

  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    dob = new Date(e.detail.value).getTime();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    child_name = undefined;
    child_name = '';
    dob = undefined;
    gender = undefined;
    guardian_role = undefined;
    contact = wx.getStorageSync('dd_phoneno');
    let ks = require('../../models/bm_kids_schema.js');
    ks.bmstoreReset();
    wx.removeStorageSync('kids');
    nowDate = Date.parse(new Date());  
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

  onCommitApply: function (e) {
    if (nowDate != undefined && contact != undefined && contact != '' && child_name != undefined && child_name != '' && dob != undefined && gender != undefined && guardian_role != undefined && guardian_role != null) {
      let ks = require('../../models/bm_kids_schema.js');
      ks.genOneKid(child_name, 'realnickname', dob, gender, guardian_role)
      ks.saveAllKidOnStorage();
      kids = ks.queryAllLocalKids();

      let callback = {
        onSuccess: function (res) {
          wx.navigateBack({
            delta: 1,
            success: function (res) { 
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000,
                mask: true,
                success: function () { }
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        },
        onFail: function () {
          console.log('push apply error');
        }
      }
      var ay = require('../../models/bm_apply_schema.js');
      ay.pushApply(nowDate, "预注册", contact, -1, kids, callback);
    } else {
      wx.showModal({
        title: '提交失败',
        content: '还有没填好的地方哦',
        success: function (res) {
          if (res.confirm) { }
          else { }
        }
      })
    }
    
  },
})