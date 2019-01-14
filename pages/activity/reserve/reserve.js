// pages/activity/reserve/reserve.js
let reservableid;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        yardname: wx.getStorageSync('yardname'),
        detailSort: wx.getStorageSync('detailSort'),
        detailName: wx.getStorageSync('detailName'),
        add_icon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/add%402x.png",
        note_icon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_warning_border%402x.png",
        note_text: "注意事项：现场付费",
        date: '',
        kids: null,
        noChild: true,
        hasChild: false,
        tel: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        reservableid = options.reservableid;
        let lm = require('../../../models/bm_applyee_schema.js');
        let ks = require('../../../models/bm_kids_schema.js');
        let kidArray = ks.queryAllLocalKids();
        if(kidArray.length == 0) {
            this.setData({
                noChild: true,
                hasChild: false
            })
        } else {
            this.setData({
                noChild: false,
                hasChild: true
            })
        }
        if (!lm.checkIsLogin()) {
            wx.redirectTo({
                url: '/pages/register/register'
            })
            return
        }
        let yardname = wx.getStorageSync('yardname');
        let detailSort = wx.getStorageSync('detailSort');
        let detailName = wx.getStorageSync('detailName');
        let yard = [];
        yard.push(yardname);
        let nowdate = this.getNowFormatDate();
        let haveChild = true;
        this.setData({
            address: yard,
            exp_date: nowdate,
            haveChild: true,
            phone: wx.getStorageSync('dd_phoneno'),
            bar: '提交订单',
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX,
            kids: kidArray,
            detailName: wx.getStorageSync('detailName'),
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
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var week = date.getDay();
        function addZero(m) {
            return m < 10 ? '0' + m : m;
        }
        var currentdate = year + seperator1 + addZero(month) + seperator1 + (strDate) + ' ' + weekDay[week];
        return currentdate;
    },

    bindExceptDateChange: function (e) {
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var date = new Date(e.detail.value);
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var week = date.getDay();
        function addZero(m) {
            return m < 10 ? '0' + m : m;
        }
        var currentdate = year + seperator1 + addZero(month) + seperator1 + (strDate) + ' ' + weekDay[week];
        this.setData({
            exp_date: currentdate
        })
    },

    addChild: function() {
        wx.navigateTo({
            url: '../addChild/addChild',
        })
    },

    inputTel: function() {
        this.setData({
            tel: true
        })
    },

    commitReserve: function() {
        this.setData({
            tel: false
        })
    }

})