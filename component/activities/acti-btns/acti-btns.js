// component/activity-banner/acti-btns/acti-btns.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isCourse: {
      type: String,
      value: "true",
    },
    exp: {
      type: "Object",
      value: null,
      observer: function (news, olds, path) {
        console.log("this is in acti-btns.js")
        console.log(news, olds)
        // if(news.SessionInfo.price === ""){
        //   news.SessionInfo.price = "免费";
        // }
        // console.log(news)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // price: 134,
    
    // isCourse: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
