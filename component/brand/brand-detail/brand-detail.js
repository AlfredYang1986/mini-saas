// component/brand/brand-detail/brand-detail.js
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
    logo: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/logo.png",
    title: "PRO科学空间",
    subtitle: "彩色方块的转动中感受魔方的魅力",
    tags: ["场景教学", "先进理念", "专业团队"],
    time: "2013年",
    story: "由经验丰富的欧美专业外教团队及国内少儿教育专家联合负责课程研发和授课；与美国常青藤暑期院校联盟、中央美术学院、中央戏剧学院众多国外大学、研究单位和教育专家合作课程，推出创新素质模块化课程。",
    team: "欧美专业外教团队及国内少儿教育专家。",
    teach:[{
      src:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brands_%20honor_00.jpg",
      time:"2014",
      name:"全国青少年编程创新大赛"
    },{
        src: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brands_%20%20honor_01.jpg",
        time: "2018",
        name: "STEM银河主题赛"
    },{
        src: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brands_%20%20honor_01.jpg",
        time: "2014",
        name: "全国青少年编程创新大赛"
    }],
    attest:[{
      img:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brands_certification.jpg",
      name:"国家艺术人才培养示范基地",
    }, {
        img: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brands_certification.jpg",
        name: "北京十大艺术教育机构",
      }, {
        img: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brands_certification.jpg",
        name: "北京十大艺术教育机构",
      }, {
        img: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brands_certification.jpg",
        name: "北京十大艺术教育机构",
      }]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
