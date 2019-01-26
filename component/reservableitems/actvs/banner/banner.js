// component/activities/acti-banner/acti-banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    actvs: {
      type: "Array",
      value: [],
      observer: function(news, olds, path) {
        let actv = [],
          brandid = '';
        if (news != null) {
          news.map((ele) => {
            brandid = ele['brand-id'];
            if (ele.start_date != -1 && ele.end_date != -1) {
              actv.push(ele)
            }
          })
          this.setData({
            actv: actv,
            brandid: brandid
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activityInfo: [{
      name: "奇妙的宇宙VR之旅",
      date: "08/12",
      week: "周四",
      local: "朝阳区",
      price: "134",
      url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_cover_activity_00.jpg",
      minAge: "4",
      maxAge: "6",
      sort: "展览",
    }, {
      name: "STEM Meeting Up",
      date: "08/12",
      week: "周四",
      local: "东城区",
      price: "134",
      url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_cover_activity_01.jpg",
      minAge: "4",
      maxAge: "6",
      sort: "讲座",
    }, {
      name: "STEM Meeting Up",
      date: "08/12",
      week: "周四",
      local: "昌平区",
      price: "134",
      url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_cover_activity_00.jpg",
      minAge: "4",
      maxAge: "6",
      sort: "展览",
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showActiDetail: function(event) {
      let actvid = event.currentTarget.dataset.actvid;
      wx.navigateTo({
        url: '/pages/reservableitems/detail/detail?expid=' + actvid
      })
    },
    showLst: function(event) {
      wx: wx.navigateTo({
        url: '/pages/reservableitems/exps/lst/lst?brandid=' + this.data.brandid + '&status=0'
      })
    }
  }
})