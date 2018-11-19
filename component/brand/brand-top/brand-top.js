// component/brand/brand-top/brand-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    brand: {
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
    title: "PRO科学空间",
    img: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_brand_detail%402x.png",
    subtitle: "彩色方块的转动中感受魔方的魅力",
    tags: ["场景教学", "先进理念", "专业团队"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    brandDetails: function (event) {
      let brandid = event.currentTarget.dataset.brandid;
      wx: wx.navigateTo({
        url: '/pages/brand/detail/detail?brandid' + brandid
      })
    }
  }
})
