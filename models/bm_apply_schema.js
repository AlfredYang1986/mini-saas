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

function genApplyeePushQuery(uinfo) {
  return {
    data: {
      id: guid(),
      type: "BmApply",
      attributes: {
        apply_time: 0,
        except_time: 0,
        brandId: "5be6a00b8fb80736e2ec9ba5",
        courseName: "",
        contact: "",
        courseType: 0,
      },
      relationships: {
        Kid: {
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
