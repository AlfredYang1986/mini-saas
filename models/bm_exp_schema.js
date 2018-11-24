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

function queryMultiExps(callback) {
	bmmulti.reset();

	let query_yard_payload = genMultiExps();
	let rd = bmmulti.sync(query_yard_payload);
	let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()))

	let inc = rd.Eqcond[0].serialize()
	rd_tmp['included'] = [inc.data]
	let dt = JSON.stringify(rd_tmp)
  let token = wx.getStorageSync('dd_token');

  var config = require('./bm_config.js')
  wx.showLoading({
      title: '加载中',
  });
  console.log('mother fucker');
	wx.request({
    url: config.bm_service_host + '/api/v1/findreservablemulti/0',
		data: dt,
		method: 'post',
    dataType: 'json',
		header: {
      'Content-Type': 'application/x-www-form-urlencoded', // 默认值
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
			console.log(err)
			callback.onFail(err)
		},
		complete() {
      wx.hideLoading();
		  console.log('complete!!!')
		}
	})
}

function queryExpInfo(expid, callback) {
    bmstore.reset();

    let query_yard_payload = genIdQuery(expid);
    let rd = bmstore.sync(query_yard_payload);
    let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

    let inc = rd.Eqcond[0].serialize();
    rd_tmp['included'] = [inc.data];
    let dt = JSON.stringify(rd_tmp);
    let token = wx.getStorageSync('dd_token');
  
    var config = require('./bm_config.js')
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
        wx.hideLoading();
        console.log('complete!!!')
      }
    })
}

function genMultiExps() {
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
                    val: 1
                }
            }
        ]
    }
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
	queryMultiExps: queryMultiExps,
  queryExpInfo: queryExpInfo,
}