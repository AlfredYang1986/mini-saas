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
    isChecking: true,
    showModal: false,
  },

  ready: function() {
    var lm = require('../../models/bm_applyee_schema.js');
    let that = this
    let callback = {
      onLoginSuccess: function () {
        that.setData({
          isChecking: false
        })
      },
      onSessionSuccess: function () {
        // 查看是否授权
        let cb = {
          onUserInfoSuccess: function (res) {
            lm.queryCurApplyee(this);
          },
          onQueryCurSuccess: function () {
            wx.redirectTo({
              url: that.properties.dir2url,
            })
          },
          onQueryCurFail: function () {
            console.log('query cur user error');
          }
        }
        lm.queryBasicInfo(cb);
      },
      onSessionFail: function () {
        lm.loginWithWechat(this)
      },
      onCodeSuccess: function (code) {
        lm.codeSuccess(code, this);
      },
      onCodeFail: function () {
        console.log('登陆，获取Code失败')
      },
    }
    lm.wechatLogin(callback);
    // lm.checkWechatSession(callback);
  },

  /**
   * Component methods
   */
  methods: {
    bindGetUserInfo(e) {
      console.log(e.detail.userInfo);
      // TODO: seem to do nothing. login sucess, and push applyee
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

      // this.setData({
      //   showModal: !this.data.showModal
      // })
      let openid = wx.getStorageSync('dd_open_id')
      var lm = require('../../models/bm_applyee_schema.js');
      lm.pushApplee(openid, e.detail.userInfo, callback);
    },
    getPhoneNumber(e) {
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        var lm = require('../../models/bm_applyee_schema.js');
        let result = lm.decryptedPhoneNumber(e.detail.encryptedData, e.detail.iv)
        console.log(result)
      }
    },

    //确定按钮点击事件
    // modalBindaconfirm: function () {
    //   this.setData({
    //     showModal: !this.data.showModal,
    //   })
    // },
    //取消按钮点击事件
    // modalBindcancel: function () {
    //   this.setData({
    //     showModal: !this.data.showModal,
    //   })
    // },
  }
})
