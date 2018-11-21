// pages/info-two/info-two.js 

Page({
  /**
  * 页面的初始数据
  */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isChecking: true,
    showModal: false
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var lm = require('../../models/bm_applyee_schema.js');
    let that = this
    let callback = {
      onLoginSuccess: function() {
        // TODO: seem to do nothing. login sucess, and push applyee
        that.setData({
          isChecking: false
        })
      },
      onSessionSuccess: function() {
        // 查看是否授权
        let cb = {
          onUserInfoSuccess: function(res) {
            lm.queryCurApplyee(this);
          },
          onQueryCurSuccess: function() {
            wx.redirectTo({
              url: '/pages/brand/info/info',
            })
          },
          onQueryCurFail: function() {
            console.log('query cur user error');
          }
        }
        lm.queryBasicInfo(cb);
      },
      onSessionFail: function() {
        lm.loginWithWechat(this)
      },
      onCodeSuccess: function(code) {
        lm.codeSuccess(code, this);
      },
      onCodeFail: function() {
        console.log('登陆，获取Code失败')
      },
    }
    lm.wechatLogin(callback);
    // lm.checkWechatSession(callback);
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
    // TODO: seem to do nothing. login sucess, and push applyee
    let callback = {
      onPushSuccess: function() {
        wx.redirectTo({
          url: '/pages/brand/info/info',
        })
      },
      onPushFail: function() {
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
  // getPhoneNumber(e) {
  //   debugger
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.iv)
  //   console.log(e.detail.encryptedData)
  // },

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