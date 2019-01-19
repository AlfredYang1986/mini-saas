//app.js
App({
  onLoginSuccess: false,
  globalData: {
    navHeight: 0,
    deviceHeight: 667,
    userExist: false,
    android: false,
    iosX: false,
  },
  onLaunch: function () {
    // var lm = require('/models/bm_applyee_schema.js');
    // let that = this
    // let callback = {
    //   onLoginSuccess: function () {
    //     let uinfo = wx.getStorageSync('uinfo')
    //     if (uinfo && uinfo != '') {
    //       that.onLoginSuccess = true;
    //     }
    //   },
    //   onUserInfoSuccess: function (res) {
    //     lm.queryCurApplyee(this);
    //   },
    //   onQueryCurSuccess: function () {
    //     wx.setStorageSync('LoginSuccess', true)
    //     that.onLoginSuccess = true;
    //   },
    //   onQueryCurFail: function () {
    //     console.log('query cur user error');
    //   },
    //   onSessionSuccess: function () {
    //     lm.queryBasicInfo(this);
    //   },
    //   onSessionFail: function () {
    //     lm.wechatLogin(this)
    //   },
    //   onCodeSuccess: function (code) {
    //     lm.codeSuccess(code, this);
    //   },
    //   onCodeFail: function () {
    //     console.log('登陆，获取Code失败')
    //   },
    // }
    // // lm.wechatLogin(callback);
    // lm.checkWechatSession(callback);

    // wx.getSystemInfo({
    //   success: res => {
    //     //导航高度
    //     console.log(res.statusBarHeight)
    //     // that.globalData.navHeight = res.statusBarHeight + 64;
    //     that.globalData.deviceHeight = res.screenHeight;
    //     console.log(res.screenHeight)
    //     console.log(res.platform)
    //     console.log(res.brand)
    //     console.log(res.model)
    //     console.log(res.model.slice(0, 8))
    //     if(res.platform === 'android') {
    //       that.globalData.android = true;
    //       // if ((res.brand === "Xiaomi" && res.model === "MIX 2") || (res.brand === "Xiaomi" && res.model === "MIX 2s")) {
    //         that.globalData.deviceHeight = 785;
    //       // }
    //     } else {
    //       if (res.model.slice(0, 8) === "iPhone X") {
    //         that.globalData.iosX = true;
    //       } else {
    //         that.globalData.iosX = false;
    //       }
    //     }
    //   }, fail(err) {
    //     console.log(err);
    //   }
    // })
  },

  setLoginSuccessWatcher(watch) { // 接收index.js传过来的data对象和watch对象
    let v = 'onLoginSuccess'
    this.observe(this, v, watch[v])
  },

  /**
   * 监听属性 并执行监听函数
   */
  observe(obj, key, watchFun) {
    var val = obj[key]; // 给该属性设默认值
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        val = value;
        watchFun(value, val); // 赋值(set)时，调用对应函数
      },
      get: function () {
        return val;
      }
    })
  }
})
