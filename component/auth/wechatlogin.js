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
    showModalStatus: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dongda: false,
    bgImg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_popup.jpg",
    smImg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%8E%88%E6%9D%83%E5%8F%91%E7%8E%B0%E6%9B%B4%E5%A4%9A%E7%B2%BE%E5%BD%A9%E9%A1%B5logo%E6%9B%BF%E6%8D%A2.png",
    watch: {
      onLoginSuccess: function (newValue) {
        console.log(newValue); // name改变时，调用该方法输出新值。
        let that = this;
        if (newValue) {
          let uinfo = wx.getStorageSync('dd_uinfo');
        //   let phoneno = wx.getStorageSync('dd_phoneno');
          if (uinfo != '' /* && phoneno != ''*/) {
            let tmp = wx.getStorageSync('qr_page')
            let tid = wx.getStorageSync('qr_page_id')
            let dir = ''
            if (tmp.startsWith('exp') && tid && tid != "") {
              dir = '/pages/classes/detail/detail?expid=' + tid
                wx.redirectTo({
                    url: dir,
                })
            }
            else if (tmp.startsWith('actv') && tid && tid != "") {
              dir = '/pages/activity/detail/detail?actvid=' + tid
                wx.redirectTo({
                    url: dir,
                })
            } else if (tmp.startsWith('pre')) {
              dir = '/pages/preregister/preregister'
                wx.redirectTo({
                    url: dir,
                })
            }else {
                console.log("register ")
            }
            
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
      let that = this
      if (e.detail.errMsg == 'getUserInfo:ok') {
        console.log(e.detail.userInfo);
        let callback = {
          onPushSuccess: function () {
            that.setData({
                'showModalStatus': false
            })
            getApp().onLoginSuccess = true;
            wx.hideLoading();
          },
          onPushFail: function () {
            console.log('push failed');
            wx.hideLoading();
          }
        }
        
        // wx.setStorageSync('dd_uinfo', JSON.stringify(e.detail.userInfo));
        if (this.data.dongda) {
            let openid = wx.getStorageSync('dd_open_id')
            var lm = require('../../models/bm_applyee_schema.js');
            lm.pushApplee(openid, e.detail.userInfo, "", callback);
        } else {
            wx.setStorageSync('dd_uinfo', JSON.stringify(e.detail.userInfo));
        //     this.setData({
        //         showModalStatus: true,
        //   })
            var lm = require('../../models/bm_applyee_schema.js');
            let encryptedData = e.detail.encryptedData.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
            // let result = lm.decryptedPhoneNumber(encryptedData, e.detail.iv)
            // console.log(result)

            let callback = {
                onPushSuccess: function () {
                    that.setData({
                        'showModalStatus': false
                    })
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
            // wx.setStorageSync('dd_phoneno', result.purePhoneNumber);
            // wx.setStorageSync('dd_phoneno', '12345');
            // lm.pushApplee(openid, uinfo, result.purePhoneNumber, callback);
            lm.pushApplee(openid, uinfo, '12345', callback);
        }
      }
    },
    getPhoneNumber(e) {
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        var lm = require('../../models/bm_applyee_schema.js');
        let encryptedData = e.detail.encryptedData.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
        // let result = lm.decryptedPhoneNumber(encryptedData, e.detail.iv)
        // console.log(result)

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
        // wx.setStorageSync('dd_phoneno', result.purePhoneNumber);
        // wx.setStorageSync('dd_phoneno', '12345');
        // lm.pushApplee(openid, uinfo, result.purePhoneNumber, callback);
        lm.pushApplee(openid, uinfo, '12345', callback);
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
    },

    brandList: function() {
        console.log("close pop-ups");
    }
  }
})
