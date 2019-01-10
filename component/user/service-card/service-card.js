// component/user/service-card/service-card.js
var bmconfig = require('../../../models/bm_config.js')
var OSS = require('../../../models/ali-oss.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
          type: "Array",
          value: [],
          observer: function (news, olds, path) {
            let that = this;
            let list = [];
            let client = new OSS({
              region: 'oss-cn-beijing',
              accessKeyId: 'LTAINO7wSDoWJRfN',
              accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
              bucket: 'bmsass'
            });
            if (news != null) {
              let reservableinfo;
              news.map((ele) => {              
                let callbackReservable = {
                  onSuccess: function (res) {
                    reservableinfo = res;
                    ele.Reservable = reservableinfo;
                    if (ele.Reservable != null && ele.Reservable != undefined) {
                      ele.Reservable.SessionInfo.yardname = wx.getStorageSync('yardname');
                      ele.Reservable.SessionInfo.price = "免费";
                      ele.Reservable.SessionInfo.dealcover = client.signatureUrl(ele.Reservable.SessionInfo.cover)
                    } 
                    var date = new Date(ele.except_time);
                    var seperator1 = "-";
                    var seperator2 = ":";
                    var month = date.getMonth() + 1;
                    var strDate = date.getDate();
                    var hour = date.getHours();
                    var minute = date.getMinutes();
                    function addZero(m) {
                      return m < 10 ? '0' + m : m;
                    }
                    ele.dealdate = date.getFullYear() + seperator1 + addZero(month) + seperator1 + (strDate) + ' ' + addZero(hour) + seperator2 + addZero(minute);

                    list.push(ele)
                    that.setData({
                      lists: list
                    })
                  },
                  onFail: function () {
                    // TODO : 报错 ...
                  }
                }
                let reservableId = ele.reservableId;
                var reservable = require('../../../models/bm_actv_schema.js')
                reservable.queryActvInfo(reservableId, callbackReservable)
                 
                
              })
              console.log(news)
              
            }
          }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        lists: null,
        card: [
            {
                title: "探索科学小屋",
                cover: 'https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brandcard-bg%402x.jpg',
                address: "五道口",
                time: "2019-02-22 周五 10:30",
                price: "¥ 免费",
            },
            {
                title: "探索科学小屋",
                cover: 'https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brandcard-bg%402x.jpg',
                address: "五道口",
                time: "2019-02-22 周五 10:30",
                price: "¥ 免费",
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
