// pages/class-lst/class-lst.js
var OSS = require('../../../models/ali-oss.js')
Page({ 
 
	/**
	 * 页面的初始数据
	 */
	data: {
		exps: null,
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
            iosX: getApp().globalData.iosX,
            bar: wx.getStorageSync('mername')
        });
        var lm = require('../../../models/bm_applyee_schema.js');
        // if (!lm.checkIsLogin()) {
        //   wx.redirectTo({
        //       url: '/pages/register/register'
        //   })
        //   return
        // }
        let client = new OSS({
            region: 'oss-cn-beijing',
            accessKeyId: 'LTAINO7wSDoWJRfN',
            accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
            bucket: 'bmsass'
        });
		let that = this;
        var bmactvs = require('../../../models/bm_actv_schema.js')
        bmactvs.queryMultiActvs(1).then(res => {
            bmactvs.queryMultiActvsSessions(res).then(res => {
                bmactvs.queryMultiSessionsImgs(res).then(result => {
                    let res = bmactvs.bmstore.findAll('reservableitems');
                    let _originRes = res;
                    let newres = _originRes.map((ele) => {
                        let _originImg = ele.sessioninfo.cover;
                        if (_originImg) {
                            ele.sessioninfo.dealCover = client.signatureUrl(_originImg);
                        } else {
                            ele.sessioninfo.dealCover = "";
                        }

                        if (ele.sessioninfo.aub == -1 && ele.sessioninfo.aub == -1) {
                            ele.sessioninfo.hasAge = false;
                        } else {
                            ele.sessioninfo.hasAge = true;
                        }
                        return ele
                    })
                    that.setData({
                        exps: bmactvs.bmstore.findAll('reservableitems')
                    })
                })
            })
        })

		wx.stopPullDownRefresh();
		wx.hideNavigationBarLoading();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
    console.log(this.data.exps)
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
	    wx.showNavigationBarLoading();
    	this.onLoad();
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

	showInfo: function (event) {
	},

	showClsDetail: function (event) {
		wx.navigateTo({
			url: '/pages/classes/detail/detail'
		})
	}
})
