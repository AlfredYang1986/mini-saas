// component/common/add-child/add-child.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  
  },

  /**
   * 组件的初始数据
   */
  data: { 
    sex: "男",
    nickname: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindKeyInput: function (e) {
      this.setData({
        nickname: e.detail.value
      })
    },
  }
})
