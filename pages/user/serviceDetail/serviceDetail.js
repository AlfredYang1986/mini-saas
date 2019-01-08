// pages/user/serviceDetail/serviceDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        infoTitle: "乐高机器人搭建课",
        infoTime: "2018-03-08 周六",
        listTitle: "PRO科学空间 五道口校区",
        listAddress: "海淀区成府路121-3 华清大厦A座 1106",
        mapIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_map%402x.png",
        noteIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_warning_border%402x.png",
        callIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_call%402x.png",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            bar: wx.getStorageSync('mername')
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

    }
})