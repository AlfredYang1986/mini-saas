// component/auth/wechatlogin.js
Component({
  /**
   * Component properties
   */
  properties: {
    dir2url: {
      type: "string",
      value: '',
      observer: function (news, olds, path) {

      }
    },
  },

  /**
   * Component initial data
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dongda: true,
    isChecking: false,
    showModalStatus: false,
    bgImg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_popup.jpg",
    smImg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_logo_popup%402x.png",
  },

  ready: function() {
    let check = wx.getStorageSync('LoginSuccess');
    let uinfo = wx.getStorageSync('dd_uinfo');
    let phoneno = wx.getStorageSync('dd_phoneno');
    if (check && uinfo != '' && phoneno != '') {
      wx.redirectTo({
        url: this.properties.dir2url
      })
    }
  },

  /**
   * Component methods
   */
  methods: {
    bindGetUserInfo(e) {
      console.log(e.detail.userInfo);
      let that = this
      let callback = {
        onPushSuccess: function () {
          wx.redirectTo({
            url: that.properties.dir2url
          })
        },
        onPushFail: function () {
          console.log('push failed');
        }
      }

      if (this.data.dongda) {
        let openid = wx.getStorageSync('dd_open_id')
        var lm = require('../../models/bm_applyee_schema.js');
        lm.pushApplee(openid, e.detail.userInfo, "", callback);
      } else {
        wx.setStorageSync('dd_uinfo', JSON.stringify(e.detail.userInfo));
        this.setData({
          showModalStatus: true,
        })
      }
    },
    getPhoneNumber(e) {
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        var lm = require('../../models/bm_applyee_schema.js');
        let result = lm.decryptedPhoneNumber(e.detail.encryptedData, e.detail.iv)
        console.log(result)

        let that = this
        let callback = {
          onPushSuccess: function () {
            wx.redirectTo({
              url: that.properties.dir2url
            })
            wx.hideLoading();
          },
          onPushFail: function () {
            console.log('push failed');
            wx.hideLoading();
          }
        }
        let openid = wx.getStorageSync('dd_open_id')
        var lm = require('../../models/bm_applyee_schema.js');
        let uinfo = JSON.parse(wx.getStorageSync('dd_uinfo'));
        wx.setStorageSync('dd_phoneno', result.purePhoneNumber);
        lm.pushApplee(openid, uinfo, result.purePhoneNumber, callback);
      }
    },

    powerDrawer: function () {
      // this.util();
      this.setData({
        showModalStatus: false,
      })
    },

    direct2BrandInfo: function() {
      wx.redirectTo({
        url: this.properties.dir2url
      })
    }
  }
})
