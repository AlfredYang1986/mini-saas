// component/classes/cla-list/cla-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isOver: {
      type: String,
      value: 'true',
    }
  },

  /**
   * 组件的初始数据
   */ 
  data: {
    time:{
      day:"05",
      month:"8月",
    },
    claCard: {
      start: "11:00开始",
      progress: "已学习12/30",
      name: "Pro.C高级课程实操",
      num: "13课时",
      bgurl: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%B4%BB%E5%8A%A82.png",
      time: "2018.01.18-2018.03.16",
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
