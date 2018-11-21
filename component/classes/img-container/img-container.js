// component/class-banner/img-containger/img-container.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    exp: {
      type: "Array",
      value: [],
      observer: function (news, olds, path) {
        console.log("this is in img-container .js")
        console.log(news, olds)
      }
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    circular: true,
    pointerColor: "#FFFFFF",
    interval: 5000,
    duration: 1000,
    images: [
      {
        url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_cover_trialclass_01.jpg"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
