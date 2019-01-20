import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

var bmstore = new JsonApiDataStore();

function queryMultiActvs() {

  let config = require("./bm_config.js");
  //返回一个Promise对象
  return new Promise(function (resolve, reject) {
    wx.request({
      method: 'GET',  
      url: config.bm_service_host + '/v0/reservableitems?status=0',
      // data: data,
      //在header中统一封装报文头，这样不用每个接口都写一样的报文头定义的代码
      header: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      // 'Authorization': 'bearer ' + token
      },
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading();
        }, 100);
        //这里可以根据自己项目服务端定义的正确的返回码来进行，接口请求成功后的处理，当然也可以在这里进行报文加解密的统一处理
        var json = JSON.stringify(res.data)
        json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
        var dealedJson = JSON.parse(json)
        let result = bmstore.sync(dealedJson)

        // for (var i = 0; i < result.length; i++) {
        //   var id = result[i].sessioninfo.id
        //   console.log(id)
        // }
        console.log(result)
        // callback.onSuccess(result)
        resolve(result)
      },
      fail: function (res) {
        console.log(err)
        // callback.onFail(err)
        reject(res);
      }
    });
  });
}

function queryMultiActvsSessions(actvs) {
  // ids query

  var tmp = [];
  let length = actvs.length;
  for (var i = 0; i < length; i++) {
    let t = actvs[i].sessioninfo
    if (t != null) {
      tmp.push(queryOneSessionById(actvs[i].sessioninfo.id));
    } 
  }

  return Promise.all(tmp)
}

function queryOneSessionById(id) {
  let config = require("./bm_config.js")
  //返回一个Promise对象
  return new Promise(function (resolve, reject) {
    wx.request({
      method: 'GET',
      url: config.bm_service_host + '/v0/sessioninfos/' + id,
      // data: data,
      //在header中统一封装报文头，这样不用每个接口都写一样的报文头定义的代码
      header: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        // 'Authorization': 'bearer ' + token
      },
      success: function (res) {
        //这里可以根据自己项目服务端定义的正确的返回码来进行，接口请求成功后的处理，当然也可以在这里进行报文加解密的统一处理
        var json = JSON.stringify(res.data)
        json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
        var dealedJson = JSON.parse(json)
        let result = bmstore.sync(dealedJson)

        // for (var i = 0; i < result.length; i++) {
        //   var id = result[i].sessioninfo.id
        //   console.log(id)
        // }
        console.log(result)
        // callback.onSuccess(result)
        resolve(result)
      },
      fail: function (res) {
        console.log(err)
        // callback.onFail(err)
        reject(res);
      }
    });
  });
}

module.exports = {
  bmstore: bmstore,
  queryMultiActvs: queryMultiActvs,
  queryMultiActvsSessions: queryMultiActvsSessions,
}