// pages/user/addChild/addChild.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: '',
        nowdate: '',
        rela: [
            { name: '妈妈', value: '妈妈', },
            { name: '爸爸', value: '爸爸', },
            { name: '其他', value: '其他' },
        ],
        sex: [
            { name: '男生', value: '男生', },
            { name: '女生', value: '女生', },
        ],
        android: false,
        iosX: false,
        deviceHeight: getApp().globalData.deviceHeight,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let nowdate = this.getNowFormatDate();
        this.setData({
            date: nowdate,
            bar: wx.getStorageSync('mername'),
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX
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

    getNowFormatDate: function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },

    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },

    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        guardian_role = e.detail.value

    },
})