// component/classes/cla-banner/cla-banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isList: {
      type: String,
      value: 'true',
    },
    exps:{
      type:"Array",
      value:[],
      observer:function(news,olds,path){
          let exp = [];
          if(news != null) {
              news.map((ele) => {
                  if (ele.start_date != -1 && ele.end_date != -1) {
                      exp.push(ele)
                  }
              })
              this.setData({
                  exp: exp
              })
          }  
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
      exp: null,
    classInfo:[{
      url:
"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_cover_trialclass_00.jpg",
      sort:"数理逻辑",
      name:"Pro.A 初级课程入门",
      age:"8-12岁",
      price:"160"
    }, {
        url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_cover_trialclass_01.jpg",
        sort: "LEGO",
        name: "Pro.A 初级课程入门",
        age: "8-12岁",
        price: "160"
      }, {
        url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_cover_trialclass_02.jpg",

        sort: "LEGO",
        name: "Pro.A 初级课程入门",
        age: "8-12岁",
        price: "160"
      }, {
        url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_cover_trialclass_03.jpg",
        sort: "LEGO",
        name: "Pro.A 初级课程入门",
        age: "8-12岁",
        price: "160"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showClasses: function (event) {
      wx.navigateTo({
        url: '/pages/classes/lst/lst'
      })
    },
    showClsDetail: function (event) {
      let expid = event.currentTarget.dataset.expid;
      wx.navigateTo({
        url: '/pages/classes/detail/detail?expid=' + expid
      })
    }
  }
})
