// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        headImg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/brand_logo.png",
        headName: "Kent",
        icon_enter: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_chevron_right_dark%402x.png",
        list: [
            {
                name: "我的服务",
                detail: "../myService/myService"
            },
            {
                name: "管理孩子",
                detail: "../manageChild/manageChild"
            },
            {
                name: "推荐给朋友",
                detail: "../../brand/info/info"
            },
            {
                name: "联系客服",
                detail: "../../brand/info/info"
            },
        ]
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

    },

    backToList() {
        wx.redirectTo({
            url: '/pages/brandlist/brandlist',
        })
    }
})