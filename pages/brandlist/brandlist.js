// pages/brandlist/brandlist.js
var OSS = require('../../models/ali-oss.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {

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
        let that = this;
        let callback = {
            onSuccess: function (res) {
                let newres = res.map((ele) => {
                    let logo = ele.logo;
                    ele.dealLogo = client.signatureUrl(logo);
                    return ele
                })
                that.setData({
                    brandList: res
                })
            },
            onFail: function () {
                // TODO : 报错 ...
            }
        }
        var bmbrand = require('../../models/bm_brand_schema.js')
        console.log(bmbrand)
        bmbrand.queryMultiBrands(callback)

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
    onShareAppMessage: function () {

    },

    showBrandDetail: function(event) {
        wx.navigateTo({
            url: '/pages/brand/info/info',
        })
    }
})