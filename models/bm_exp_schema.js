import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

var bmstore = new JsonApiDataStore();
// var bmmulti = new JsonApiDataStore(); 

function queryMultiExps() {
	bmstore.reset();

  var config = require('./bm_config.js')
  wx.showLoading({
      title: '加载中',
  });
  return new Promise(function (resolve, reject) {
    wx.request({
      url: config.bm_service_host + '/v0/reservableitems?status=1',
      method: 'GET',
      // dataType: 'json',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json',
        // 'Authorization': 'bearer ' + token
      },
      success(res) {
        var json = JSON.stringify(res.data)
        json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
        var dealedJson = JSON.parse(json)
        let result = bmstore.sync(dealedJson)
        console.log(result)
        resolve(result)
        // callback.onSuccess(result)
      },
      fail(err) {
        console.log(err)
        // callback.onFail(err)
        reject(err)
      },
      complete() {
      //   wx.hideLoading();
        console.log('complete!!!')
      }
    });
  });
}

function queryMultiExpsSessions(exps) {
  // ids query

  var tmp = [];
  let length = exps.length;
  for (var i = 0; i < length; i++) {
    let t = exps[i].sessioninfo
    if (t != null) {
      tmp.push(queryExpInfoById(t.id));
    }
  }

  return Promise.all(tmp)
}

function queryExpInfoById(expid) {
  // bmstore.reset();

  var config = require('./bm_config.js')
  // wx.showLoading({
  //     title: '加载中',
  // });
  return new Promise(function (resolve, reject) {
    wx.request({
      url: config.bm_service_host + '/v0/sessioninfos/' + expid,
      // data: dt,
      method: 'GET',
      header: {
          'Content-Type': 'application/json', // 默认值
          'Accept': 'application/json',
          // 'Authorization': 'bearer ' + token
      },
      success(res) {
        var json = JSON.stringify(res.data)
        json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
        var dealedJson = JSON.parse(json)
        let result = bmstore.sync(dealedJson)
        console.log(result)
        // callback.onSuccess(result)
        resolve(res)
      },
      fail(err) {
        // callback.onFail(err)
        reject(err)
      },
      complete() {
        // wx.hideLoading();
        console.log('complete!!!')
      }
    })
  });
}

module.exports = {
  bmstore: bmstore,
	queryMultiExps: queryMultiExps,
  queryMultiExpsSessions: queryMultiExpsSessions,
  queryExpInfoById: queryExpInfoById,
}