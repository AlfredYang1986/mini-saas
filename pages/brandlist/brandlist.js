// pages/info-two/info-two.js 
var OSS = require('../../models/ali-oss.js')
Page({
    /**
    * 页面的初始数据
    */
    data: {
        modalHidden: true,
        logo: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%AC%A2%E8%BF%8E%E9%A1%B5logo%E6%9B%BF%E6%8D%A2.png",
        slogan: "百造学堂，一百种方法玩转知识",
        showModalStatus: true,
        subLogo: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_dongdalogo26%403x.png",
        bar: "咚哒精选",
        android: false,
        iosX: false,
        deviceHeight: getApp().globalData.deviceHeight,
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        this.setData({
          android: getApp().globalData.android,
          iosX: getApp().globalData.iosX
        });

        let tmp = options.redir
        console.log('tmp: ', tmp)
        if (tmp) {
            wx.setStorageSync('qr_page', tmp)
        }
        let tid = options.reservableid
        console.log('tid: ', tid)
        if (tid) {
            wx.setStorageSync('qr_page_id', tid)
        }
        let brandid = options.brandid
        if (brandid) {
            wx.setStorageSync('brandid', brandid)
        }

        let client = new OSS({
            region: 'oss-cn-beijing',
            accessKeyId: 'LTAINO7wSDoWJRfN',
            accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
            bucket: 'bmsass'
        });
        let that = this;
        var bmbrand = require('../../models/bm_brand_schema.js')
        bmbrand.queryMultiBrands().then(res => {
          let newres = res.map((ele) => {
            let logo = ele.logo;
            ele.dealLogo = client.signatureUrl(logo);
            return ele
          })
          that.setData({
            brandList: res
          })
        }).catch(err => {
          console.log('error')
        })

        wx.stopPullDownRefresh();
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
    onShareAppMessage: function (event) {

    },

})