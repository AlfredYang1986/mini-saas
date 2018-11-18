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

function genOneKid(name, nick_name, dob, gender, guardian_role) {
  let kid = {
    data: {
      id: guid(),
      type: "BmKid",
      attributes: {
        name: name,
        nickname: nick_name,
        dob: dob,
        gender: gender,
        guardian_role: guardian_role
      }
    }
  }
  bmstore.sync(kid)
}

function queryAllLocalKids() {
  // bmstore.reset();
  return bmstore.findAll('BmKid');
}

function queryLocalKidByID(kidid) {
  return bmstore.find('BmKid', kidid);
}

function saveAllKidOnStorage() {
  let kids = queryAllLocalKids();
  let result = [];
  for (let idx = 0; idx < kids.length; idx++) {
    result.push(kids[idx].serialize());
  }
  wx.setStorage({
    key: 'kids',
    data: JSON.stringify(result),
  })
}

function loadAllKidOnStrage() {
  bmstore.reset();
  wx.getStorage({
    key: 'kids',
    success: function(res) {
      let result = JSON.parse(res);
      for (let idx = 0; idx < result.length; idx++) {
        bmstore.sync(result[idx]);
      }
    },
  })
}

module.exports = {
  genOneKid: genOneKid,
  loadAllKidOnStrage: loadAllKidOnStrage,
  queryAllLocalKids: queryAllLocalKids,
  queryLocalKidByID: queryLocalKidByID,
  saveAllKidOnStorage: saveAllKidOnStorage
}