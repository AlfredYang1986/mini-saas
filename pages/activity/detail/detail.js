// pages/activity/activity.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

var id;

var OSS = require('../../../models/ali-oss.js')

let detailSort;
let detailName;
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    actv: null,
    isFold: true,
    show: false,
    hide: true,
    showTime:false,
    showOthers: true,
    animationData: {},
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    array:[{
      img:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/shape_female_normal%403x.png",
      text: "小公主",
    },
    {
      img:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/shape_male_normal%403x.png",
      text:"小王子",
    }],
    id:0,
  },
  showAll: function (e) {
    this.setData({
      isFold: !this.data.isFold,
    })
  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  tab_slide: function (e) {//滑动切换tab 
    var that = this;
    that.setData({ tab: e.detail.current });
  },
  tab_click: function (e) {//点击tab切换
    var that = this;
    if (that.data.tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAINO7wSDoWJRfN',
      accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
      bucket: 'bmsass'
    });
    let that = this
    let callback = {
      onSuccess: function (res) {
        console.log(res)
        detailSort = res.status;
        detailName = res.SessionInfo.title;
        console.log(detailSort)
        console.log(detailName)
        wx.setStorageSync('detailSort', detailSort);
        wx.setStorageSync('detailName', detailName);
        let _originRes = res;
        let _originImg = res.SessionInfo.cover;
        res.SessionInfo.dealCover = client.signatureUrl(_originImg);
        that.setData({
          actv: res
        })
      },
      
    }
    var bmactv = require('../../../models/bm_actv_schema.js')
    bmactv.queryActvInfo(options.actvid, callback)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  applyList: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 200,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(500).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      show: true,
      hide: false,
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 100)


  },

  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(100).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        show: false,
        hide: true,
      })
    }, 100)
  },

  showSuccess:function(evevt) {
    wx.navigateTo({
      url: '../success/success',
    })
  },

  selectTime:function(event) {
    this.setData({
      showTime:true,
      showOthers: false,
    })
  },

  hideTime:function(event) {
    this.setData({
      showTime:false,
      showOthers:true,
    })
  },

  showmap: function(event) {
    wx.navigateTo({
      url: '/pages/locations/detail/map/map',
    })
  },

  choseColor:function(e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值
    this.setData({
      id: id
    })
  },

  applyPage:function(event) {
    console.log(event)
    let that = this;
    let childid = event.currentTarget.dataset.id;
    wx:wx.navigateTo({
      url: '/pages/activity/apply/apply?childid=' + childid,
    })
  }
})
