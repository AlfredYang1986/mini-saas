// pages/activity/reserve/reserve.js
let reservableid;
let kidArray;
let expect_date;
let detailName;
let detailSort;
let kid = [];
let phone;
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
        tel: false,
        errorInfo: false,
        sex: '',
        now: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        reservableid = options.reservableid;
        detailSort = wx.getStorageSync('detailSort');
        detailName = wx.getStorageSync('detailName');
        expect_date = new Date().getTime();
        let that = this;
        let lm = require('../../../models/bm_applyee_schema.js');
        let ks = require('../../../models/bm_kids_schema.js');
        kidArray = ks.queryAllLocalKids();
        kidArray.map((ele) => {
            if (ele.gender == 0) {
                ele.sex = '女生'
            } else {
                ele.sex = '男生'
            }
            let dob = new Date(ele.dob)
            let dn = new Date();
            ele.age = dn.getFullYear() - dob.getFullYear();
        })
        if (kidArray.length == 0) {
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
        let nowdate = this.getNowFormatDate();
        let now = this.getNowFormatDateNoWeek();
        this.setData({
            exp_date: nowdate,
            phone: wx.getStorageSync('dd_phoneno'),
            bar: '提交订单',
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX,
            kids: kidArray,
            detailName: wx.getStorageSync('detailName'),
            now: now
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
    getNowFormatDateNoWeek: function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        function addZero(m) {
            return m < 10 ? '0' + m : m;
        }
        var currentdate = year + seperator1 + addZero(month) + seperator1 + (strDate)
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
        expect_date = new Date(e.detail.value).getTime();
        this.setData({
            exp_date: year + seperator1 + addZero(month) + seperator1 + (strDate) + ' ' + weekDay[week]
        })
    },

    addChild: function () {
        wx.redirectTo({
            url: '/pages/activity/addChild/addChild?reservableid=' + reservableid,
        })
    },

    inputTel: function () {
        let that = this
        if (kid.length == 0) {
            this.setData({
                errorInfo: true
            })
            setTimeout(function () {
                that.setData({
                    errorInfo: false
                })
            }, 2000)
        } else {
            if (expect_date != undefined && detailName != undefined && detailSort != undefined && reservableid != undefined && kid != undefined && kid.length != 0) {
                this.setData({
                    tel: true
                })
            }
        }

    },

    commitReserve: function () {
        let that = this;
        if (expect_date != undefined && detailName != undefined && detailSort != undefined && reservableid != undefined && kid != undefined && kid.length != 0 && phone != undefined && phone != '') {
            let callback = {
                onSuccess: function (res) {
                    let reservableid = res.id
                    that.setData({
                        tel: false
                    })
                    wx.navigateTo({
                        url: '/pages/activity/success/success?reservableid=' + reservableid,
                    })
                },
                onFail: function () {
                    console.log('push apply error');
                }
            }
            var ay = require('../../../models/bm_apply_schema.js');
            ay.pushApply(expect_date, detailName, phone, detailSort, reservableid, kid, callback);
        }
    },

    kidRadioChange: function (e) {
        let kidname = e.detail.value;
        kid = [];
        kidArray.map((ele) => {
            if (ele.name == kidname) {
                kid.push(ele)
                return kid
            }
        })
    },

    bindKeyInput: function (e) {
        phone = e.detail.value
        this.setData({
            phone: e.detail.value
        })
    },
})