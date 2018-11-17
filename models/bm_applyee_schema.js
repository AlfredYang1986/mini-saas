import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

var bmstore = new JsonApiDataStore();

function checkWechatSession(callback) {
  wx.checkSession({
    success() {
      console.log('token 没有过期，直接登陆');
      callback.onSessionSuccess();
    },
    fail() {
      callback.onSessionFail(callback);
    }
  })
}

function loginWithWechat(callback) {
  wx.login({
    success(res) {
      if (res.code) {
        console.log(res.code);
        wx.setStorageSync('code', res.code);
        callback.onCodeSuccess(res.code);
      } else {
        // islogin = false
        console.log('登录失败！' + res.errMsg)
        callback.onCodeFail();
      }
    }
  })
}

function queryUserBasicInfo(callback) {
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        wx.getUserInfo({
          success: function (res) {
            console.log(res.userInfo)
            callback.onUserInfoSuccess(res);
          }
        })
      }
    }
  })
}

const appid = 'wx6129e48a548c52b8';
const secret = 'b250e875e51a931e2ae3a49ff450bc3c';

function codeSuccess(code, callback) {
  wx.request({
    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
    method: 'get',
    success(res) {
      wx.setStorageSync('dd_open_id', res.data.openid)
      callback.onLoginSuccess(res);
    },
    fail(err) {
      console.log('fail!!!')
      callback.onLoginFail(err);
    },
    complete() {
      console.log('complete!!!')
    }
  })
}

function queryUserPhone(callback) {

}

function genApplyeePushQuery(uinfo) {
  let g = 2;
  if (uinfo.gender == 1) g = 1
  else if (uinfo.gender == 2) g = 0
  else g = 2;

  return {
    data: {
      id: guid(),
      type: "BmApplyee",
      attributes: {
        name: uinfo.nickName,
        pic: uinfo.avatarUrl,
        regi_phone: "",
        wechat_bind_phone: "",
        gender: g,
        wechat_code: wx.getStorageSync('code'),
      },
      relationships: {

      }
    },
    included: []
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function pushApplee(openid, uinfo, callback) {
  let query_payload = genApplyeePushQuery(uinfo);
  let result = bmstore.sync(query_payload);

  let rd_tmp = JSON.parse(JSON.stringify(result.serialize()));
  let dt = JSON.stringify(rd_tmp);

  wx.request({
    url: 'http://192.168.100.174:8080/api/v1/pushapplyee/0',
    data: dt,
    method: 'post',
    header: {
      'Content-Type': 'application/json', // 默认值
      'Accept': 'application/json',
      'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
    },
    success(res) {
      let result = bmstore.sync(res.data);
      wx.setStorageSync("dd_token", result.token);
      console.log(result);
      callback.onPushSuccess(result);
    },
    fail(err) {
      console.log('fail!!!')
      callback.onPushFail(err);
    },
    complete() {
      console.log('complete!!!')
    }
  })
}

module.exports = {
  checkWechatSession: checkWechatSession,
  wechatLogin: loginWithWechat,
  queryBasicInfo: queryUserBasicInfo,
  pushApplee: pushApplee,
  codeSuccess: codeSuccess,
}