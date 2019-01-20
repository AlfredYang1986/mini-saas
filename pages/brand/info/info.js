// pages/brand/brand.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mername: "百造PACEE",
    brand:{
      logobg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/logo_bg.png",
      logourl:"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/logo%403x.png",
    },
    tab:1, 
    exps: null,
    actvs: null,
    brandInfo: null,
    android: false,
    iosX: false,
    deviceHeight: getApp().globalData.deviceHeight,
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
    this.setData({
      android: getApp().globalData.android,
      iosX: getApp().globalData.iosX
    });
    var lm = require('../../../models/bm_applyee_schema.js');
    if (!lm.checkIsLogin()) {
      wx.redirectTo({
        url: '/pages/register/register'
      })
      return
    }

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    var OSS = require('../../../models/ali-oss.js');
    let client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAINO7wSDoWJRfN',
      accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
      bucket: 'bmsass'
    });

    var bmconfig = require('../../../models/bm_config.js')
    var bmactvs = require('../../../models/bm_actv_schema.js')
      bmactvs.queryMultiActvsWithLimits(1, 3).then(res => {
          bmactvs.queryMultiActvsSessions(res).then(res => {
              bmactvs.queryMultiSessionsImgs(res).then(result => {
                  let tmp = bmactvs.bmstore.findAll("reservableitems");
                  function expFunc(tt) {
                      return tt.status == 1;
                  }
                  let res = tmp.filter(expFunc);
                  let _originRes = res;
                  let newres = _originRes.map((ele) => {
                      let _originImg = ele.sessioninfo.cover;
                      ele.sessioninfo.dealCover = client.signatureUrl(_originImg);
                      if (ele.sessioninfo.aub == -1 && ele.sessioninfo.alb == -1) {
                          ele.sessioninfo.hasAge = false;
                      } else {
                          ele.sessioninfo.hasAge = true;
                      }
                      return ele
                  })

                  that.setData({
                      exps: res,
                  })
              })
          })
      })
      bmactvs.queryMultiActvsWithLimits(0, 3).then(res => {
        bmactvs.queryMultiActvsSessions(res).then(res => {
            bmactvs.queryMultiSessionsImgs(res).then(result => {
                let tmp = bmactvs.bmstore.findAll("reservableitems");
                function actvFunc(tt) {
                    return tt.status == 0;
                }
                let res = tmp.filter(actvFunc);
                let _originRes = res;
                let newres = _originRes.map((ele) => {
                    let _originImg = ele.sessioninfo.cover;
                    ele.sessioninfo.dealCover = client.signatureUrl(_originImg);
                    if (ele.sessioninfo.aub == -1 && ele.sessioninfo.alb == -1) {
                        ele.sessioninfo.hasAge = false;
                    } else {
                        ele.sessioninfo.hasAge = true;
                    }
                    return ele
                })

                that.setData({
                    actvs: res,
                })
            })
        })
    })
    var bmbrand = require('../../../models/bm_brand_schema.js')
    bmbrand.queryBrand(bmconfig.bm_baizao_id).then(res => {
        let logo = res.logo;
        res.newLogo = client.signatureUrl(logo);
        that.setData({
            brandInfo: res,
            mername: res.subtitle
        })
        wx.setStorage({
            key: "mername",
            data: res.subtitle
        })

        that.setData({
            bar: wx.getStorageSync('mername')
        })
    })

    var bmyard = require('../../../models/bm_yard_schema.js')
    bmyard.queryYard(bmconfig.bm_baizao_yard_id).then(res => {
        bmyard.queryMultiYardImgs(res).then(result => {

            let res = bmyard.bmstore.find("yards", bmconfig.bm_baizao_yard_id)
            let tagimgs = res.images;
            let newimgs = tagimgs.map((ele) => {
                let tagImg = ele.img;
                ele.dealImg = client.signatureUrl(tagImg);
                return ele
            })

            res.cover1 = res.images[0].dealImg;
            res.cover2 = res.images[1].dealImg;
            res.cover3 = res.images[2].dealImg;

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
        })
    })

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
  
  scanclick: function(res) {
    wx.scanCode({
      success: (res) => {
        let parse = require('url-parse')
        let url = parse(res.path, true);

        let tmp = url.query.redir
        let tid = url.query.reservableid
        let dir = ''
        if (tmp && tmp.startsWith('exp') && tid && tid != "") {
          dir = '/pages/classes/detail/detail?expid=' + tid
        }
        else if (tmp &&  tmp.startsWith('actv') && tid && tid != "") {
          dir = '/pages/activity/detail/detail?actvid=' + tid
        } else if (tmp && tmp.startsWith('pre')) {
          dir = '/pages/preregister/preregister'
        } else {
          dir = '/pages/brand/info/info'
        }
        console.log(dir)
        if (dir.length > 0) {
          wx.navigateTo({
            url: dir,
          })
        } else {
          console.log('二维码错误')
        }
      }
    })
  },

  backToList() {
     wx.redirectTo({
        url: '/pages/brandlist/brandlist',
    })
  }
})