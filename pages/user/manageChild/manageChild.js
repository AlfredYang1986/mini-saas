// pages/user/manageChild/manageChild.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        android: false,
        iosX: false,
        deviceHeight: getApp().globalData.deviceHeight,
        kids: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let ks = require('../../../models/bm_kids_schema.js');
        let kidArray = ks.queryAllLocalKids();
        this.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX,
            bar: wx.getStorageSync('mername'),
            kids: kidArray
        });
        
        // let callback = {
        //     onSuccess: function (res) {
        //         debugger
        //         console.log(res)
        //     },
        //     onFail: function(err) {
        //       console.log(err)
        //     }
        // }
        
        // let ers = ks.loadAllKidOnStrage(callback);

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

    goback: function() {
        wx.switchTab({
            url: '/pages/user/user-info/user-info',
        })
    },

    addChild: function() {
        wx.navigateTo({
            url: '/pages/user/addChild/addChild',
        })
    }
})