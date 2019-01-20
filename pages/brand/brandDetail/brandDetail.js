// pages/brand/brandDetail/brandDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        backIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_back_light%402x.png",
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

        let client = new OSS({
            region: 'oss-cn-beijing',
            accessKeyId: 'LTAINO7wSDoWJRfN',
            accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
            bucket: 'bmsass'
        });
        let that = this
        let callback = {
            onSuccess: function (res) {
                let logo = res.logo;
                res.newLogo = client.signatureUrl(logo);
                let honors = res.Honors;
                if (honors != null) {
                    let newHonors = honors.map((ele) => {
                        let honorsImg = ele.img;
                        ele.dealImg = client.signatureUrl(honorsImg);
                        return ele
                    })
                }

                let Certifications = res.Certifications;
                if (Certifications != null) {
                    let newCertifications = Certifications.map((ele) => {
                        let certificationsImg = ele.img;
                        ele.dealImg = client.signatureUrl(certificationsImg);
                        return ele
                    })
                }

                let found = res.found;
                res.time = new Date(found).getFullYear();
                that.setData({
                    brand: res
                })
            },
            onFail: function () {
                // TODO : 报错 ...
            }
        }
        var bmbrand = require('../../../models/bm_brand_schema.js')
        bmbrand.queryBrand(options.brandid, callback)
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

    goBack: function () {
        wx.navigateBack({
            delta: 1
        })
    }
})