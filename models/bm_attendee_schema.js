
import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

var store = new JsonApiDataStore();

const bm_attendee_parload = {
  data: {
    id: "1",
    type: "BMAttendee",
    attributes: {
      intro: "新来的",
      status: "candidate",
      lesson_count: 12
    },
    relationships: {
      person: {
        data: {
          id: "2",
          type: "BMPerson"
        }
      },
      guardians: {
        data: [{
          id: "3",
          type: "BMGuardian"
        }, {
          id: "4",
          type: "BMGuardian"
        }]
      }
    }
  },
  included: [{
    id: "2",
    type: "BMPerson",
    attributes: {
      name: "赵云",
      nickname: "子龙",
      icon: "icon",
      dob: 111,
      gender: "male",
      reg_date: 222
    }
  }, {
    id: 3,
    type: "BMGuardian",
    attributes: {
      relation_ship: "兄弟"
    },
    relationships: {
      person: {
        data: {
          id: "5",
          type: "BMPerson"
        }
      }
    }
  }, {
    id: "4",
    type: "BMGuardian",
    attributes: {
      relation_ship: "姐妹"
    },
    relationships: {
      person: {
        data: {
          id: "6",
          type: "BMPerson"
        }
      }
    }
  }, {
    id: "5",
    type: "BMPerson",
    attributes: {
      "name": "李逍遥",
      "nickname": "逍遥",
      "icon": "icon",
      "dob": 111,
      "gender": "male",
      "reg_date": 222
    }
  }, {
    "id": "6",
    "type": "BMPerson",
    "attributes": {
      name: "黑寡妇",
      nickname: "寡妇",
      icon: "icon",
      dob: 111,
      gender: "female",
      reg_date: 222
    }
  }]
}
var query_payload = 
{
  data: {
    id: "1",
    type: "Request",
    attributes: {
      res: "BmAttendee"
    },
    relationships: {
      Eqcond: {
        data: [
          {
            id: "2",
            type: "Eqcond"
          }
        ]
      }
    }
  },
  included: [
    {
      id: "2",
      type: "Eqcond",
      attributes: {
        key: "id",
        val: "5be92a238fb80762403a4712"
      }
    }
  ]
}

function attendee() {
  return store.sync(bm_attendee_parload)
  // 把json字符串变为可点的对象
}

function change2Json() {
  let tmp = attendee()
  let bk = tmp.serialize()
  return JSON.stringify(bk)
}

function queryAttendee() {
  let rd = store.sync(query_payload)
  let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()))
  let inc = rd.Eqcond[0].serialize()
  rd_tmp['included'] = [inc.data]
  let dt = JSON.stringify(rd_tmp)

  let config = require('./bm_config.js');
  wx.request({
    url: config.bm_service_host + '/api/v1/findattendee/0', //仅为示例，并非真实的接口地址
    data: dt,
    method: 'post',
    header: {
      'Content-Type': 'application/json', // 默认值
      'Accept': 'application/json',
      'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
    },
    success(res) {
      let result = store.sync(res.data)
    },
    fail(res) {
      console.log('fail!!!')
    },
    complete() {
      console.log('complete!!!')
    }
  })
}
module.exports = {
  attendee: attendee(),
  change2Json: change2Json,
  queryAttendee: queryAttendee
}