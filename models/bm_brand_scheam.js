// import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

// var bmstore = new JsonApiDataStore();

// function guid() {
//   function s4() {
//     return Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   }
//   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
// }


// function queryBrand(expid, callback) {
//   bmstore.reset();

//   let query_yard_payload = genIdQuery(expid);
//   let rd = bmstore.sync(query_yard_payload);
//   let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

//   let inc = rd.Eqcond[0].serialize();
//   rd_tmp['included'] = [inc.data];
//   let dt = JSON.stringify(rd_tmp);

//   wx.request({
//     url: 'http://192.168.100.174:8080/api/v1/findbrand/0',
//     data: dt,
//     method: 'post',
//     header: {
//       'Content-Type': 'application/json', // 默认值
//       'Accept': 'application/json',
//       'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
//     },
//     success(res) {
//       let result = bmstore.sync(res.data)
//       callback.onSuccess(result)
//     },
//     fail(err) {
//       callback.onFail(err)
//     },
//     complete() {
//       console.log('complete!!!')
//     }
//   })
// }

// function genIdQuery(tmpid) {
//   let eq = guid();
//   return {
//     data: {
//       id: guid(),
//       type: "Request",
//       attributes: {
//         res: "BmBrand"
//       },
//       relationships: {
//         Eqcond: {
//           data: [
//             {
//               id: eq,
//               type: "Eqcond"
//             }
//           ]
//         }
//       }
//     },
//     included: [
//       {
//         id: eq,
//         type: "Eqcond",
//         attributes: {
//           key: "id",
//           val: tmpid
//         }
//       }
//     ]
//   }
// }

// module.exports = {
//   queryBrand: queryBrand
// }