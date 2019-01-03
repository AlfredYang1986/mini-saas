import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

var bmstore = new JsonApiDataStore();
var bmmulti = new JsonApiDataStore();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function queryMultiBrands(callback) {
    bmmulti.reset();

    let query_yard_payload = genMultiBrands();
    let rd = bmmulti.sync(query_yard_payload);
    let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
    let brand = rd.Fmcond.serialize();
    let nebrand = rd.Necond[0].serialize();
    rd_tmp['included'] = [brand.data, nebrand.data];

    let dt = JSON.stringify(rd_tmp);

    let token = wx.getStorageSync('dd_token');
    console.log('token: ' + token)

    let config = require('./bm_config.js')

      wx.showLoading({
        title: '加载中',
      });
    wx.request({
        method: 'POST',
        url: config.bm_service_host + '/api/v1/findbrandmulti/0',
        header: {
            'Content-Type': 'application/json', // 默认值
            'Accept': 'application/json',
            'Authorization': 'bearer ' + token
        },
        data: dt,
        success(res) {
            var json = JSON.stringify(res.data)
            json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
            var dealedJson = JSON.parse(json)
            let result = bmmulti.sync(dealedJson)
            console.log(result)
            callback.onSuccess(result)
        },
        fail(err) {
            console.log(err)
            callback.onFail(err)
        },
        complete() {
            wx.hideLoading();
            console.log('complete!!!')
        }
    })
}

function genMultiBrands() {
    let fm = guid();
    let ne = guid();
    return {
        data: {
            id: guid(),
            type: "Request",
            attributes: {
                res: "BmBrand"
            },
            relationships: {
                "Fmcond": {
                    "data":
                        {
                            "id": fm,
                            "type": "Fmcond"
                        }
                },
                "Necond":{
                    "data": [
                        {
                            "id": ne,
                            "type": "Necond"
                        }
                    ]
                }
            }
        },
        included: [
            {
                "id": fm,
                "type": "Fmcond",
                "attributes": {
                    page: 0,
                    take: 0,
                }
            },
            {
                "id": ne,
                "type": "Necond",
                "attributes": {
                    key: "id",
                    val: "5c19bbce25c6b0000188f4bc"
                }
            } 
        ]
    }
}


function queryBrand(brandid, callback) {
  bmstore.reset();

  let query_yard_payload = genIdQuery(brandid);
  let rd = bmstore.sync(query_yard_payload);
  let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

  let inc = rd.Eqcond[0].serialize();
  rd_tmp['included'] = [inc.data];
  let dt = JSON.stringify(rd_tmp);
  let token = wx.getStorageSync('dd_token')

  let config = require('./bm_config.js')
//   wx.showLoading({
//     title: '加载中',
//   });
  wx.request({
    url: config.bm_service_host + '/api/v1/findbrand/0',
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
      let result = bmstore.sync(dealedJson)
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
  let config = require('./bm_config.js')
  return {
    data: {
      id: guid(),
      type: "Request",
      attributes: {
        res: "BmBrand"
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
          val: config.bm_baizao_id
        }
      }
    ]
  }
}

module.exports = {
    queryMultiBrands: queryMultiBrands,
    queryBrand: queryBrand
}