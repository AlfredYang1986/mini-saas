// pages/brand-detail/brand-detail.js

var OSS = require('../../../models/ali-oss.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		brand: null,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
    pageContantHeight: getApp().globalData.pageContantHeight 
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			android: getApp().globalData.android,
			iosX: getApp().globalData.iosX
		});
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
		let store = require('../../../models/bm-data.js').store;
		let bmconfig = require('../../../models/bm_config.js')
		store.Find('brands', bmconfig.bm_baizao_id).then(res => {
			let logo = res.logo;
			res.newLogo = client.signatureUrl(logo);
			let images = res.images;
			if(images != null) {
					images.map((ele) => {
							let honorsImg = ele.img;
							ele.dealImg = client.signatureUrl(honorsImg);
							return ele
					})
			}
			function honorFunc (tmp) {
					return tmp.flag == 1;
			}
			function certFunc(tmp) {
					return tmp.flag == 2;
			}
			res.Honors = images.filter(honorFunc);
			res.Certifications = images.filter(certFunc);

			let found = res.found;
			res.time = new Date(found).getFullYear();
			that.setData({
					brand: res
			})
		})

		that.setData({
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