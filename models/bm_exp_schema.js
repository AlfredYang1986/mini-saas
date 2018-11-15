import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

var bmstore = new JsonApiDataStore();
var bmmulti = new JsonApiDataStore();
console.log(bmstore);

function queryMultiObjects() {
  this.bmmulti.reset();

  let query_yard_payload = this.genMultiQuery();
  let rd = this.bmmulti.sync(query_yard_payload);
  let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
  console.log("rdrdrdrd");
  console.log(rd);
}

function genMultiQuery() {
  let eq = this.guid();
  return {
    data: {
      id: this.guid(),
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
