// pages/class-lst/class-detail/class-detail.js 

var OSS = require('../../../models/ali-oss.js')

let classDetailSort;
let classDetailName;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    isCourse: true,
    isFold: true,
    show: false,
    hide: true,
    showTime: false,
    showOthers: true,
    animationData: {},
    tab:0,
    exp: null,
    reward: true,
    remarks: true,
    notice: true,
  },

  showAll: function (e) {
    this.setData({
      isFold: !this.data.isFold,
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
    var lm = require('../../../models/bm_applyee_schema.js');
    if (!lm.checkIsLogin()) {
      wx.redirectTo({
        url: '/pages/register/register'
      })
      return
    }

    var bmconfig = require('../../../models/bm_config.js')
    let client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAINO7wSDoWJRfN',
      accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
      bucket: 'bmsass'
    });
    let that = this;
    let callback = {
      onSuccess: function (res) {
        res.SessionInfo.price = "免费";
        bmconfig.bm_baizao_actvPrice.map((ele) => {
          if (res.id === ele.actvId){
            res.SessionInfo.price = ele.price;
          }
        })
        classDetailSort = res.status;
        classDetailName = res.SessionInfo.title;
        wx.setStorageSync('detailSort', classDetailSort);
        wx.setStorageSync('detailName', classDetailName);
        let tagimgs =res.SessionInfo.Tagimgs
        let newTagimgs = tagimgs.map((ele) => {
          let tagimg = ele.img;
          if (tagimg !== ""){
            ele.dealImg = client.signatureUrl(tagimg);
          }
          return ele
        })
        res.SessionInfo.Tagimgs = newTagimgs;
        let _originImg = res.SessionInfo.cover;
        res.SessionInfo.dealCover = client.signatureUrl(_originImg);
        res.SessionInfo.yardtag = wx.getStorageSync('yardtag');
        res.SessionInfo.yardname = wx.getStorageSync('yardname');

        if (res.SessionInfo.length == -1) {
          res.SessionInfo.hasLenght = false;
        } else {
          res.SessionInfo.hasLenght = true;
        }

        if (res.SessionInfo.aub == -1 && res.SessionInfo.alb == -1) {
          res.SessionInfo.hasAge = false;
        } else {
          res.SessionInfo.hasAge = true;
        }

        if (res.SessionInfo.acquisition == "") {
          that.setData({
            reward: false
          })
        }

        if (res.SessionInfo.inc == "") {
          that.setData({
            remarks: false
          })
        }

        that.setData({
          exp: res
        })
      },
      onFail: function () {
        // TODO : 报错 ...
      }
    }
    var bmexp = require('../../../models/bm_exp_schema.js')
    bmexp.queryExpInfo(options.expid, callback)

      wx.setNavigationBarTitle({
          title: wx.getStorageSync('mername')//页面标题为路由参数
      })
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
  applyDetail: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(300).step()
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
      duration: 200,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(300).step()
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
  
  showSuccess: function(event) {
    wx.navigateTo({
      url: '../success/success',
    })
  },
  apply: function(event) {
    wx:wx.navigateTo({
      url: '/pages/classes/apply/apply',
    })
  }

})