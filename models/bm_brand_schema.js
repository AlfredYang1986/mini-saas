import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

var bmstore = new JsonApiDataStore();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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
      let result = bmstore.sync(res.data)
      callback.onSuccess(result)
    },
    fail(err) {
      callback.onFail(err)
    },
    complete() {
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
          val: '5be6a00b8fb80736e2ec9ba5'
        }
      }
    ]
  }
}

module.exports = {
  queryBrand: queryBrand
}