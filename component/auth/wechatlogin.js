// component/auth/wechatlogin.js
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dongda: false,
    showModalStatus: false,
    bgImg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_popup.jpg",
    smImg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%8E%88%E6%9D%83%E5%8F%91%E7%8E%B0%E6%9B%B4%E5%A4%9A%E7%B2%BE%E5%BD%A9%E9%A1%B5logo%E6%9B%BF%E6%8D%A2.png",
    watch: {
      onLoginSuccess: function (newValue) {
        console.log(newValue); // name改变时，调用该方法输出新值。
        if (newValue) {
          let uinfo = wx.getStorageSync('dd_uinfo');
          let phoneno = wx.getStorageSync('dd_phoneno');
          if (uinfo != '' && phoneno != '') {
            let tmp = wx.getStorageSync('qr_page')
            let tid = wx.getStorageSync('qr_page_id')
            let dir = ''
            if (tmp.startsWith('exp') && tid && tid != "") {
              dir = '/pages/classes/detail/detail?expid=' + tid
            }
            else if (tmp.startsWith('actv') && tid && tid != "") {
              dir = '/pages/activity/detail/detail?actvid=' + tid
            } else if (tmp.startsWith('pre')) {
              dir = '/pages/preregister/preregister'
            }else {
              dir = '/pages/brand/info/info'
            }
            wx.redirectTo({
              url: dir,
            })
            wx.removeStorage({
              key: 'qr_page',
              success: function(res) {},
            })
            wx.removeStorage({
              key: 'qr_page_id',
              success: function (res) { },
            })
          }
        }
      }
    }
  },

  ready: function() {
    getApp().setLoginSuccessWatcher(this.data.watch);
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
          getApp().onLoginSuccess = true;
          wx.hideLoading();
        },
        onPushFail: function () {
          console.log('push failed');
          wx.hideLoading();
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
            getApp().onLoginSuccess = true;
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
