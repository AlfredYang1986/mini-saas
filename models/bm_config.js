// var host = 'https://api.dongdakid.com'
var host = 'http://192.168.100.174:8080'
var brandid = '5c19bbce25c6b0000188f4bc'
var yardid = '5c19f04c8fb8073d6b954a29'

var actvPrice = [
  {
    actvId: "5bec89ae8fb80730e07b9e56",
    price: "免费"
  },
  {
    actvId: "5beea5ab8fb80759ab78e5db",
    price: "免费"
  },
  {
    actvId: "5bf4232b21235c000163c24b",
    price: "108起"
  },
  {
    actvId: "5bf43aa721235c000163c33c",
    price: "VIP免費使用"
  },
  {
    actvId: "5bf68dc6b078430001508ff1",
    price: "49起"
  },
]

module.exports = {
  bm_service_host: host,
  bm_baizao_id: brandid,
  bm_baizao_yard_id: yardid,
  bm_baizao_actvPrice: actvPrice
}