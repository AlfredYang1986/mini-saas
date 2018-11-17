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

function genApplyeePushQuery(except_time, course_name, contact, course_type) {
  let now = new Date().getTime()
  return {
    data: {
      id: guid(),
      type: "BmApply",
      attributes: {
        apply_time: now,
        except_time: except_time,
        brandId: "5be6a00b8fb80736e2ec9ba5",
        courseName: course_name,
        contact: contact,
        courseType: course_type,
      },
      relationships: {
        Kids: {
          data: []
        },
        Applyee: {
          data: {}
        }
      }
    },
    included: []
  }
}

function pushApply(except_time, course_name, contact, course_type, kids, callback) {
  var lm = require('./bm_applyee_schema.js');
  bmstore.reset();
  let query_payload = genApplyeePushQuery(except_time, course_name, contact, course_type);
  let result = bmstore.sync(query_payload);
  result.Kids = kids
  result.Applyee = lm.queryLocalApplyee();

  let inc = [];
  for (let idx = 0; idx < result.Kids.length; idx++) {
    let tmp = result.Kids[idx].serialize();
    inc.push(tmp.data);
  }
  let applyee = result.Applyee.serialize();
  inc.push(applyee.data);

  let rd_tmp = JSON.parse(JSON.stringify(result.serialize()));
  rd_tmp['included'] = inc;
  let dt = JSON.stringify(rd_tmp);
  console.log(dt);
  debugger
  wx.request({
    url: 'http://192.168.100.174:8080/api/v1/pushapply/0',
    data: dt,
    method: 'post',
    header: {
      'Content-Type': 'application/json', // 默认值
      'Accept': 'application/json',
      'Authorization': 'bearer ' + wx.getStorageSync('dd_token')
    },
    success(res) {
      let result = bmstore.sync(res.data);
      callback.onSuccess(result);
    },
    fail(err) {
      console.log('fail!!!')
      callback.onFail(err);
    },
    complete() {
      console.log('complete!!!')
    }
  })
}

module.exports = {
  pushApply: pushApply,
}