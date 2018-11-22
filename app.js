//app.js
App({
  onLaunch: function () {
    var lm = require('/models/bm_applyee_schema.js');
    let that = this
    let callback = {
      onLoginSuccess: function () {
        wx.setStorageSync('LoginSuccess', true)
      },
      onUserInfoSuccess: function (res) {
        lm.queryCurApplyee(this);
      },
      onQueryCurSuccess: function () {
        wx.setStorageSync('LoginSuccess', true)
      },
      onQueryCurFail: function () {
        console.log('query cur user error');
      },
      onSessionSuccess: function () {
        lm.queryBasicInfo(this);
      },
      onSessionFail: function () {
        lm.wechatLogin(this)
      },
      onCodeSuccess: function (code) {
        lm.codeSuccess(code, this);
      },
      onCodeFail: function () {
        console.log('登陆，获取Code失败')
      },
    }
    // lm.wechatLogin(callback);
    lm.checkWechatSession(callback);
  },
})
