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
            resolve(result)
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

function queryMultiBrandImgs(brand) {
    var tmp = [];
    // let length = yard.length;
    // for (var i = 0; i < length; i++) {
    // let ti = sessions[i];
    for (var j = 0; j < brand.images.length; j++) {
        let ig = brand.images[j].id
        tmp.push(queryBrandImageById(ig, brand.id));
    }
    // }

    return Promise.all(tmp);
}

function queryBrandImageById(id, par_id) {
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
                let par = bmstore.find('brands', par_id);
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
    queryMultiBrandImgs: queryMultiBrandImgs,
    queryBrandImageById: queryBrandImageById,
    queryMultiBrands: queryMultiBrands,
    queryBrand: queryBrand
}