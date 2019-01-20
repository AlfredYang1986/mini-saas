import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

var bmstore = new JsonApiDataStore();

function queryMultiBrands() {
  bmstore.reset();

  let config = require('./bm_config.js')

  wx.showLoading({
    title: '加载中',
  });
  return new Promise(function (resolve, reject) {
    wx.request({
        method: 'GET',
        url: config.bm_service_host + '/v0/brands',
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
            console.log(err)
            // callback.onFail(err)
            reject(err)
        },
        complete() {
            wx.hideLoading();
            console.log('complete!!!')
        }
    })
  });
}

function queryBrand(brandid) {

  let config = require('./bm_config.js')
//   wx.showLoading({
//     title: '加载中',
//   });
  return new Promise(function (resolve, reject) {
    wx.request({
      url: config.bm_service_host + '/v0/brands/' + brandid,
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
        resolve(result)
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
    queryMultiBrands: queryMultiBrands,
    queryBrand: queryBrand
}