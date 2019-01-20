import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

var bmstore = new JsonApiDataStore();

function queryMultiActvs() {

  let config = require("./bm_config.js");
  //返回一个Promise对象
  return new Promise(function (resolve, reject) {
    wx.request({
      method: 'GET',  
      url: config.bm_service_host + '/v0/reservableitems?status=1',
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

function genMultiActvs() {
  let eq = guid();
  let br = guid();
  let bmconfig = require('../models/bm_config.js');
  let brandid = bmconfig.bm_baizao_id;
  return {
    data: {
      id: guid(),
      type: "Request",
      attributes: {
        res: "BmReservable"
      },
      relationships: {
        Eqcond: {
          data: [
            {
              id: eq,
              type: "Eqcond"
            },
            {
              id: br,
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
          key: "status",
          val: 0
        }
      },
      {
        id: br,
        type: "Eqcond",
        attributes: {
            key: "brandId",
            val: brandid
        }
      }
    ]
  }
}

function queryActvInfo(actvid, callback) {
  // bmstore.reset();

  let query_yard_payload = genIdQuery(actvid);
  let rd = bmstore.sync(query_yard_payload);
  let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

  let inc = rd.Eqcond[0].serialize();
  rd_tmp['included'] = [inc.data];
  let dt = JSON.stringify(rd_tmp);
  let token = wx.getStorageSync('dd_token');
  console.log('token: ' + token)

  let config = require('./bm_config.js');
//   wx.showLoading({
//     title: '加载中',
//   });
  wx.request({
    url: config.bm_service_host + '/api/v1/findreservable/0',
    data: dt,
    method: 'post',
    header: {
      'Content-Type': 'application/json', // 默认值
      'Accept': 'application/json',
      'Authorization': 'bearer ' + token
    },
    success(res) {
      var json = JSON.stringify(res.data)
      json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
      var dealedJson = JSON.parse(json)
      let result = bmmulti.sync(dealedJson)
      console.log(result)
      callback.onSuccess(result)
    },
    fail(err) {
      callback.onFail(err)
    },
    complete() {
    //   wx.hideLoading();
      console.log('complete!!!')
    }
  })
}

function genIdQuery(tmpid) {
  let eq = guid();
  return {
    data: {
      id: guid(),
      type: "Request",
      attributes: {
        res: "BmReservable"
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
          key: "id",
          val: tmpid
        }
      }
    ]
  }
}

module.exports = {
  bmstore: bmstore,
  queryMultiActvs: queryMultiActvs,
  queryActvInfo: queryActvInfo,
  queryMultiActvsSessions: queryMultiActvsSessions,
}