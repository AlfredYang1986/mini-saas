import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

var bmstore = new JsonApiDataStore();

function queryActvsById(id) {
    let config = require("./bm_config.js")

    return new Promise(function(resolve, reject){
        wx.request({
            method: 'GET',
            url: config.bm_service_host + '/v0/reservableitems/' + id,
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
    })
}

function queryMultiActvsWithLimits(status, limits) {

    let config = require("./bm_config.js");
    //返回一个Promise对象
    return new Promise(function (resolve, reject) {
        wx.request({
            method: 'GET',
            url: config.bm_service_host + '/v0/reservableitems?status=' + status + "&page[number]=1&page[size]=" + limits,
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

function queryMultiActvs(status) {

  let config = require("./bm_config.js");
  //返回一个Promise对象
  return new Promise(function (resolve, reject) {
    wx.request({
      method: 'GET',  
      url: config.bm_service_host + '/v0/reservableitems?status=' + status,
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
      tmp.push(queryOneSessionById(actvs[i].sessioninfo.id, actvs[i].id));
    } 
  }

  return Promise.all(tmp)
}

function queryMultiSessionsImgs(sessions) {
  var tmp = [];
  let length = sessions.length;
  for (var i = 0; i < length; i++) {
    let ti = sessions[i];
    for (var j = 0; j < ti.images.length; j++) {
      let ig = ti.images[j].id
      tmp.push(querySessionImageById(ig, ti.id));
    }
  }
  
  return Promise.all(tmp);
}

function querySessionImageById(id, par_id) {
  let config = require("./bm_config.js")
  //返回一个Promise对象
  return new Promise(function (resolve, reject) {
    wx.request({
      method: 'GET',
      url: config.bm_service_host + '/v0/images/' + id,
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
        let par = bmstore.find('sessioninfos', par_id);
        //par.sessioninfo = result;
        for (var i = 0; i < par.images.length; i++) {
          if (par.images[i].id == result.id) {
            par.images[i] = result;
            break;
          }
        }

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

function queryOneSessionById(id, par_id) {
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
        let par = bmstore.find('reservableitems', par_id);
        par.sessioninfo = result;
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
    queryActvsById: queryActvsById,
    queryMultiActvsWithLimits: queryMultiActvsWithLimits,
  queryMultiActvs: queryMultiActvs,
  queryMultiActvsSessions: queryMultiActvsSessions,
  queryMultiSessionsImgs: queryMultiSessionsImgs,
}