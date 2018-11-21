// pages/preregister/preregister.js
let contact;
let nowDate;
let child_name;
let gender;
let guardian_role;
let dob;
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
    logo: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brands_logo_bzbold_xxs%402x.png",
  },

  nameInput: function (e) {
    child_name = e.detail.value;
  },

  contactInput: function (e) {
    contact = e.detail.value;
  },

  sexChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    gender = e.detail.value

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
    // let kids = this.queryAttendedKids();
    // let childid = event.currentTarget.dataset.childid;
    debugger
    let ks = require('../../models/bm_kids_schema.js');
    // if (nickname != undefined && nickname != '' && dob != undefined && gender != undefined && guardian_role != undefined && guardian_role != null) {
      ks.genOneKid(child_name, 'realnickname', dob, gender, guardian_role)
      ks.saveAllKidOnStorage();
      let kids = ks.queryAllLocalKids();
    // }
    // if (except_time != undefined && detailName != undefined && contact != undefined && detailSort != undefined && kids != undefined);
    let callback = {
      onSuccess: function (res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          mask: true
        })
      },
      onFail: function () {
        console.log('push apply error');
      }
    }
    var ay = require('../../models/bm_apply_schema.js');
    ay.pushApply(nowDate, "预注册", contact, "预注册", kids, callback);
  },
})