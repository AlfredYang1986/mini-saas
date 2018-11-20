// component/activities/acti-remarks/acti-remarks.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isRemarks: {
      type: String,
      value: 'true',
    },
    exp: {
      type: "Array",
      value: [],
      observer: function (news, olds, path) {
        console.log("this is in acti-remarks .js")
        console.log(news, olds)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    "remarks": [
      "教学用具", "免费的饮品和零食",
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
