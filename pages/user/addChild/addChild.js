// pages/user/addChild/addChild.js
let name;
let guardian_role;
let dob;
let gender;
let childid;
let nowdate 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        errorInfo: false,
        nodelete: false,
        date: '',
        nowdate: '',
        checkgirl: '',
        checkboy: '',
        checkfather: '',
        checkmother: '',
        checkother: '',
        rela: [
            { name: '妈妈', value: '妈妈', checked: 'checked'},
            { name: '爸爸', value: '爸爸', checked: ''},
            { name: '其他', value: '其他', checked: ''},
        ],
        sex: [
            { name: '男生', value: '男生', checked: 'checked'},
            { name: '女生', value: '女生', checked: ''},
        ],
        android: false,
        iosX: false,
        deviceHeight: getApp().globalData.deviceHeight,
        name: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        childid = options.childid;
        nowdate = this.getNowFormatDate();
        dob = new Date().getTime();
        name = undefined;
        guardian_role = undefined;
        gender = undefined;
        let that = this;
        if(childid != undefined && childid != '') {
            let ks = require('../../../models/bm_kids_schema.js');
            let kidInfo = ks.queryLocalKidByID(childid)
            name = kidInfo.name

            let date = new Date(kidInfo.dob);
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            let dealdate = date.getFullYear() + '-' + month + '-' + strDate;

            if(kidInfo.gender == 0) {
                that.setData({
                    checkgirl: 'checked'
                })
            } else {
                that.setData({
                    checkboy: 'checked'
                })
            }

            if(kidInfo.guardian_role == '爸爸') {
                that.setData({
                    checkfather: 'checked'
                })
            } else if(kidInfo.guardian_role == '妈妈') {
                that.setData({
                    checkmother: 'checked'
                })
            } else {
                that.setData({
                    checkother: 'checked'
                })
            }

            this.setData({
                name: kidInfo.name,
                date: dealdate
            })
        } else {
            this.setData({
                date: nowdate
            })
        }
        
        
        this.setData({
            bar: wx.getStorageSync('mername'),
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX,
            nowdate: nowdate
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
        dob = new Date(e.detail.value).getTime();
    },

    radioChange: function (e) {
        guardian_role = e.detail.value
    },

    sexRadioChange: function(e) {
        if (e.detail.value == '男生') {
            gender = 1;
        } else if (e.detail.value == '女生') {
            gender = 0;
        }
    },

    bindKeyInput: function (e) {
        name = e.detail.value;
    },

    saveKid() {
        let ks = require('../../../models/bm_kids_schema.js');
        if (childid != undefined && childid != '') {
            let kid = ks.queryLocalKidByID(childid);
            ks.bmstoredelete(kid);
        }

        if (name != undefined && name != '' && dob != undefined && gender != undefined && guardian_role != undefined && guardian_role != null) {
            ks.genOneKid(name, 'nickname', dob, gender, guardian_role)
            wx.redirectTo({
                url: '/pages/user/manageChild/manageChild',
            })
        } else {
            let that = this
            this.setData({
                errorInfo: true
            })
            setTimeout(function () {
                that.setData({
                    errorInfo: false
                })
            }, 2000)
        }
        
    },

    deleteKid() {
        let ks = require('../../../models/bm_kids_schema.js');
        if (childid != undefined && childid != '') {
            let kid = ks.queryLocalKidByID(childid);
            ks.bmstoredelete(kid);
            name = undefined;
            dob == undefined;
            gender == undefined;
            guardian_role == undefined;
        }
        wx.redirectTo({
            url: '/pages/user/manageChild/manageChild',
        })
    }
})