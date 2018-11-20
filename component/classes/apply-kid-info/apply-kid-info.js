// component/classes/apply-kid-info/apply-kid-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    kid: {
      type: "Array",
      value: [],
      observer: function (news, olds, path) {
        console.log(news)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
