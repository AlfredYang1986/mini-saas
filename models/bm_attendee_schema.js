
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

function attendee() {
  return store.sync(bm_attendee_parload)
}

function change2Json() {
  let tmp = attendee()
  let bk = tmp.serialize()
  console.log(bk)
  return JSON.stringify(bk)
}

console.log(attendee)

module.exports = {
  attendee: attendee(),
  change2Json: change2Json
}