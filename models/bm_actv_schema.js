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

function queryMultiActvs(callback) {
  bmmulti.reset();

  let query_yard_payload = genMultiActvs();
  let rd = bmmulti.sync(query_yard_payload);
  let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

  let inc = rd.Eqcond[0].serialize();
  rd_tmp['included'] = [inc.data];
  let dt = JSON.stringify(rd_tmp);
  let token = wx.getStorageSync('dd_token');
  console.log('token: ' + token)

  let config = require('./bm_config.js')

  wx.showLoading({
    title: '加载中',
  });
  wx.request({
    method: 'POST',
    url: config.bm_service_host + '/api/v1/findreservablemulti/0',
    header: {
      'Content-Type': 'application/json', // 默认值
      'Accept': 'application/json',
      'Authorization': 'bearer ' + token
    },
    data: dt,
    success(res) {
      console.log(res.data)
      let result = bmmulti.sync(res.data)
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

function genMultiActvs() {
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
          key: "status",
          val: 0
        }
      }
    ]
  }
}

function queryActvInfo(actvid, callback) {
  bmstore.reset();

  let query_yard_payload = genIdQuery(actvid);
  let rd = bmstore.sync(query_yard_payload);
  let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

  let inc = rd.Eqcond[0].serialize();
  rd_tmp['included'] = [inc.data];
  let dt = JSON.stringify(rd_tmp);
  let token = wx.getStorageSync('dd_token');
  console.log('token: ' + token)

  let config = require('./bm_config.js');
  wx.showLoading({
    title: '加载中',
  });
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
      let result = bmstore.sync(res.data)
      callback.onSuccess(result)
    },
    fail(err) {
      callback.onFail(err)
    },
    complete() {
      wx.hideLoading();
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
  queryMultiActvs: queryMultiActvs,
  queryActvInfo: queryActvInfo, 
}