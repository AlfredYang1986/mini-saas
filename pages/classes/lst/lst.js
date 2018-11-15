// pages/class-lst/class-lst.js
Page({ 
 
	/**
	 * 页面的初始数据
	 */
	data: {
		exps: null,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this
		let callback = {
			onSuccess: function(res) {
        console.log("this is res")
        console.log(res)
				that.setData({
					exps: res
				})
			},
			onFail: function() {
				// TODO : 报错 ...
			}
		}
		var bmexps = require('../../../models/bm_exp_schema.js')
		bmexps.queryMultiExps(callback)
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
