// pages/booking/appointment/addkid/addkid.js

let name;
let guardian_role;
let dob;
let gender;
let childid;
let now;
let reservableid;
let datePicker;
let isFromManage;
let candel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorInfo: false,
    date: '',
    nowdate: '',
    checkgirl: '',
    checkboy: '',
    checkfather: '',
    checkmother: '',
    checkother: '',
    rela: [{
        name: '妈妈',
        value: '妈妈',
        checked: 'checked'
      },
      {
        name: '爸爸',
        value: '爸爸',
        checked: ''
      },
      {
        name: '其他',
        value: '其他',
        checked: ''
      },
    ],
    sex: [{
        name: '男生',
        value: '男生',
        checked: 'checked'
      },
      {
        name: '女生',
        value: '女生',
        checked: ''
      },
    ],
    android: getApp().globalData.android,
    iosX: getApp().globalData.iosX,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
    pageContantHeight: getApp().globalData.pageContantHeight,
    name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let ks = require('../../../../models/bm_kids_schema.js'),
      store = require('../../../../models/bm-data.js').store,
      that = this;
    ({
      reservableid,
      datePicker,
      childid,
      candel
    } = options);
    isFromManage = options.wherefrom == 'managerkids' ? true : false;

    now = this.getNowFormatDate();
    dob = new Date().getTime();
    if (typeof childid == 'undefined') {
      ({
        name,
        guardian_role,
        gender
      } = {});
      this.setData({
        date: now
      })
    } else {
      // let kidInfo = ks.queryLocalKidByID(childid);
      // let kidInfo = null;
      store.Find('kids', childid).then(kidInfo => {
        let date = new Date(kidInfo.dob),
          tmp_month = date.getMonth() + 1,
          month = tmp_month < 10 ? "0" + tmp_month : tmp_month,
          tmp_strDate = date.getDate(),
          strDate = tmp_strDate < 10 ? "0" + tmp_strDate : tmp_strDate,
          dealdate = date.getFullYear() + '-' + month + '-' + strDate;
        name = kidInfo.name

        if (kidInfo.gender == 0) {
          that.setData({
            checkgirl: 'checked'
          })
        } else {
          that.setData({
            checkboy: 'checked'
          })
        }

        if (kidInfo.guardian_role == '爸爸') {
          that.setData({
            checkfather: 'checked'
          })
        } else if (kidInfo.guardian_role == '妈妈') {
          that.setData({
            checkmother: 'checked'
          })
        } else {
          that.setData({
            checkother: 'checked'
          })
        }

        that.setData({
          name: kidInfo.name,
          date: dealdate
        })
      })
    }
    // name = undefined;
    // guardian_role = undefined;
    // gender = undefined;
    this.setData({
      isFromManage: isFromManage,
      candel: Number(candel),
      bar: '添加孩子',
      android: getApp().globalData.android,
      iosX: getApp().globalData.iosX,
      nowdate: now
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

  getNowFormatDate: function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
    dob = new Date(e.detail.value).getTime();
  },

  radioChange: function(e) {
    guardian_role = e.detail.value
  },

  sexRadioChange: function(e) {
    if (e.detail.value == '男生') {
      gender = 1;
    } else if (e.detail.value == '女生') {
      gender = 0;
    }
  },

  bindKeyInput: function(e) {
    name = e.detail.value;
  },

  saveKid() {
    let ks = require('../../../../models/bm_kids_schema.js'),
      store = require('../../../../models/bm-data.js').store,
      tmp_kidsdatum = null,
      kidsdatum = null;

    if (name != undefined && name != '' && dob != undefined && gender != undefined && guardian_role != undefined && guardian_role != null) {
      // ks.genOneKid(name, 'nickname', dob, gender, guardian_role);
      tmp_kidsdatum = {
        "applicant-id": wx.getStorageSync('dd_id'),
        "name": name,
        "dob": dob,
        "gender": gender,
        "guardian-role": guardian_role
      };
      let kidsdatum = store.createRecord('kids', tmp_kidsdatum);
      store.Save('kids', kidsdatum).then(res => {
        ks.genOneKid(res.id, name, 'nickname', dob, gender, guardian_role);
        if (isFromManage) {
          // wx.redirectTo({
          //   url: '/pages/user/manageChild/manageChild',
          // })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.redirectTo({
            url: '/pages/booking/appointment/order/order?reservableid=' + reservableid + '&datePicker=' + datePicker,
          })
        }
      })

    } else {
      let that = this
      this.setData({
        errorInfo: true
      })
      setTimeout(function() {
        that.setData({
          errorInfo: false
        })
      }, 2000)
    }
    // ks.saveAllKidOnStorage();
  },

  deleteKid() {
    let ks = require('../../../../models/bm_kids_schema.js'),
      store = require('../../../../models/bm-data.js').store;
    if (childid != undefined && childid != '') {
      // let kid = ks.queryLocalKidByID(childid);
      // ks.bmstoredelete(kid);
      // name = undefined;
      // dob = undefined;
      // gender = undefined;
      // guardian_role = undefined;
      //}
      store.DeleteRecord('kids', childid).then(res => {
        let kid = ks.queryLocalKidByID(childid);
        ks.bmstoredelete(kid);
        name = undefined;
        dob = undefined;
        gender = undefined;
        guardian_role = undefined;
        wx.redirectTo({
          url: '/pages/user/manageChild/manageChild',
        })
      })
    }
  }
})