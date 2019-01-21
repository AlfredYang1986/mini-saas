import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'
import { bm_service_host } from './bm_config.js'

var bmstore = new JsonApiDataStore();

function checkWechatSession(callback) {
  wx.checkSession({
    success() {
      console.log('token 没有过期，直接登陆');

      let sk = wx.getStorageSync('dd_session_key');
      let oid = wx.getStorageSync('dd_open_id');

      if (oid != "" && sk != "") {
        callback.onSessionSuccess();
      } else {
        callback.onSessionFail(callback);
      }
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
      } else {
        // 微信登陆，可是没有点授权
        // let uinfo = wx.getStorageSync('dd_uinfo');
        // let phoneno = wx.getStorageSync('dd_phoneno');
        callback.onSessionFail(callback);
      }
    }
  })
}

function genOpenIdQuery(code) {
  let eq = guid()
  let eq0 = guid()
  return  {
      data: {
        id: guid(),
        type: "Request",
        attributes: {
          res: "BmWeChatInfo"
        },
        relationships: {
          Eqcond: {
            data: [
              {
                id: eq,
                type: "Eqcond"
              },
              {
                id: eq0,
                type: "Eqcond"
              }
            ]
          }
        }
      },
      included: [
        {
          id: eq,
          type: "Eqcond",
          attributes: {
            key: "code",
            val: code
          }
        },
        {
          id: eq0,
          type: "Eqcond",
          attributes: {
            key: "brand",
            // val: "pacee"
            val: 'dongda' // 1. dongda 2. pacee
          }
        }
      ]
    }
}

function genWeChatInfoQuery(code) {
  return  {
    "server-name": "dongda",
    "code": code,
  }  
}

function codeSuccess(code, callback) {
  wx.showLoading({
    title: '加载中',
  });

  let req = genWeChatInfoQuery(code)
  let dt = JSON.stringify(req)

  let config = require('./bm_config.js')
  wx.request({
    url: config.bm_service_host + '/v0/GetWeChatInfo',
    method: 'post',
    data: dt,
    success(res) {
      var json = JSON.stringify(res.data)
      json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
      var dealedJson = JSON.parse(json)
      // let result = bmstore.sync(dealedJson)
      let result = res.data.result
      console.log(result)
      wx.setStorageSync('dd_open_id', result.OpenId)
      wx.setStorageSync('dd_session_key', result.SessionKey)
      callback.onLoginSuccess(res);
    },
    fail(err) {
      console.log('fail!!!')
      callback.onLoginFail(err);
    },
    complete() {
      wx.hideLoading();
      console.log('complete!!!')
    }
  })
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function genApplyeePushQuery(uinfo, phoneno) {
  let g = 2;
  if (uinfo.gender == 1) g = 1
  else if (uinfo.gender == 2) g = 0
  else g = 2;

  return {
    data: {
      id: guid(),
      type: "Applicant",
      attributes: {
        "name": uinfo.nickName,
        "pic": uinfo.avatarUrl,
        "regi-phone": phoneno,
        "wechat-bind-phone": phoneno,
        "wechat-openid": wx.getStorageSync('dd_open_id'),
        gender: g,
      },
      relationships: {

      }
    },
    included: []
  }
}

function pushApplee(openid, uinfo, phoneno, callback) {
  bmstore.reset();

    let req = genApplyeePushQuery(uinfo, phoneno)
    let rd = bmstore.sync(req);
    let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()))

    let dt = JSON.stringify(rd_tmp)

  let config = require('./bm_config.js');
  wx.showLoading({
    title: '加载中',
  });
  wx.request({
    url: config.bm_service_host + '/v0/ApplicantValidation',
    data: dt,
    method: 'post',
    header: {
      'Content-Type': 'application/json', // 默认值
      'Accept': 'application/json',
      // 'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
    },
    success(res) {
      var json = JSON.stringify(res.data)
      json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
      var dealedJson = JSON.parse(json)
      let result = bmstore.sync(dealedJson)
      console.log(result)
      wx.setStorageSync("dd_id", result.id);
      wx.setStorageSync("dd_token", result.token);
      console.log(result);
      callback.onPushSuccess(result);
    },
    fail(err) {
      console.log('fail!!!')
      callback.onPushFail(err);
    },
    complete() {
      wx.hideLoading();
      console.log('complete!!!')
    }
  })
}

function genQueryUserById() {
  let eq = guid();
  return {
    data: {
      id: guid(),
        type: "Request",
          attributes: {
        res: "BmApplyee"
      },
      relationships: {
        Eqcond: {
          data: [
            {
              id: eq,
              type: "Eqcond"
            }
          ]
        }
      }
    },
    included: [
      {
        id: eq,
        type: "Eqcond",
        attributes: {
          key: "wechat_openid",
          val: wx.getStorageSync("dd_open_id")
        }
      }
    ]
  }
}

function queryPushedApplee(callback) {
  bmstore.reset();

  let config = require('./bm_config.js');
  wx.showLoading({
    title: '加载中',
  });
  wx.request({
    url: config.bm_service_host + '/v0/applicants/' + wx.getStorageSync('dd_id'),
    // data: dt,
    method: 'GET',
    header: {
      'Content-Type': 'application/json', // 默认值
      'Accept': 'application/json',
      'Authorization': 'bearer ' + wx.getStorageSync('dd_token')
    },
    success(res) {
      var json = JSON.stringify(res.data)
      json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
      var dealedJson = JSON.parse(json)
      let result = bmstore.sync(dealedJson)
    //   debugger
    //   wx.setStorageSync("dd_id", result.Applyee.id);
    //   wx.setStorageSync("dd_token", result.token);
      console.log(result);
      callback.onQueryCurSuccess(result);
    },
    fail(err) {
      console.log('fail!!!')
      callback.onQueryCurFail(err);
    },
    complete() {
      wx.hideLoading();
      console.log('complete!!!')
    }
  })
}

function queryLocalApplyee() {
  return bmstore.find('BmApplyee', wx.getStorageSync('dd_id'));
}

function decryptedPhoneNumber(encryptedData, iv) {
  // base64 decode
  let dd_session_key = wx.getStorageSync("dd_session_key")

  let decript = require('./decrypt.min.js');
  let decode = decript(encryptedData, iv, dd_session_key)
  console.log(decode)

  return decode
}

// only for shared pages
function checkIsLogin() {
  let uinfo = wx.getStorageSync('dd_uinfo');
  let phoneno = wx.getStorageSync('dd_phoneno')
  if ((!uinfo && uinfo.length == 0) || (!phoneno && phoneno.length)) {
    return false
  }
  return true
}

module.exports = {
  checkWechatSession: checkWechatSession,
  wechatLogin: loginWithWechat,
  queryBasicInfo: queryUserBasicInfo,
  pushApplee: pushApplee,
  codeSuccess: codeSuccess,
  queryCurApplyee: queryPushedApplee,
  queryLocalApplyee: queryLocalApplyee,
  decryptedPhoneNumber: decryptedPhoneNumber,
  checkIsLogin: checkIsLogin
}