// component/common/all-class/all-class.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // isOver: {
    //   type: String,
    //   value: 'true',
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    card:[{
      isOver:"0",
      day:"08/12",
      week:"周四",
      time:"10:00",
      start:"",
      end:"",
      sort: "3D打印",
      className: "Pro.X 综合课程专业",
      progress: "已学习12/30",
      percent:"30"
    }, {
        isOver:"1",
        day: "08/12",
        week: "周四",
        time: "10:00",
        start: "2017.09.24",
        end: "2018.01.24",
        sort: "编程",
        className: "Pro.B 中级课程进阶",
        progress: "已学习30/30",
        percent:"100"
      },],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
