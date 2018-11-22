// pages/brand/brand.js
var OSS = require('../../../models/ali-oss.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand:{
      logobg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/logo_bg.png",
      logourl:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/logo%403x.png",
    },
    tab:1, 
    exps: null,
    actvs: null,
    brandInfo: null,
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
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    let client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAINO7wSDoWJRfN',
      accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
      bucket: 'bmsass'
    });
    //获取可视窗口高度
    let callback = {
      onSuccess: function (res) {
        let _originRes = res;
        let newres =  _originRes.map((ele)=> {
          let _originImg = ele.SessionInfo.cover;
          ele.SessionInfo.dealCover = client.signatureUrl(_originImg);
            return ele
        })
        that.setData({
          exps: res,
        })
      },
      onFail: function () {
        // TODO : 报错 ...
      }
    };
    let callbackActvs = {
      onSuccess: function (res) {
        let _originRes = res;
        let newres = _originRes.map((ele) => {
          let _originImg = ele.SessionInfo.cover;
          ele.SessionInfo.dealCover = client.signatureUrl(_originImg);
            return ele
        })
        that.setData({
          actvs: res,
        })
      },
      onFail: function () {
        // TODO : 报错 ...
      }
    }
    let callbackBrand = {
      onSuccess: function (res) {
        console.log(res)
        let logo = res.logo;
        res.newLogo = client.signatureUrl(logo);
        that.setData({
          brandInfo: res,
        })
      },
      onFail: function (err) {
        // TODO : 报错 ...
        console.log(err)
      }
    }

    let callbackYard = {
      onSuccess: function (res) {
        let tagimgs = res.Tagimgs;
        let newimgs = tagimgs.map((ele) => {
          let tagImg = ele.img;
          ele.dealImg = client.signatureUrl(tagImg);
          return ele
        })

        res.cover1 = res.Tagimgs[0].dealImg;
        res.cover2 = res.Tagimgs[1].dealImg;
        res.cover3 = res.Tagimgs[2].dealImg;

        wx.setStorage({
          key: "yardname",
          data: res.address
        })
        wx.setStorage({
          key: 'yardtag',
          data: res.Tagimgs,
        })
        console.log(res)
        that.setData({
          yardInfo: res,
        })
      },
      onFail: function (err) {
        // TODO : 报错 ...
        console.log(err)
      }
    }
    var bmconfig = require('../../../models/bm_config.js')
    var bmexp = require('../../../models/bm_exp_schema.js')
    bmexp.queryMultiExps(callback)
    var bmactvs = require('../../../models/bm_actv_schema.js')
    bmactvs.queryMultiActvs(callbackActvs)
    var bmbrand = require('../../../models/bm_brand_schema.js')
    bmbrand.queryBrand(bmconfig.brandid,callbackBrand)
    var bmyard = require('../../../models/bm_yard_schema.js')
    bmyard.queryYard(bmconfig.yardid, callbackYard)

    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
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
    wx.showNavigationBarLoading();
    this.onLoad();
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

  showBrandDetail: function (event) {
    wx.navigateTo({
      url: '/pages/brand/details/details'
    })
  },
  

})