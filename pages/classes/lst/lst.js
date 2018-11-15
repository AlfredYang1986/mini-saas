// pages/class-lst/class-lst.js

var helloData = {
	name: 'WeChat'
  }
Page({ 

	/**
	 * 页面的初始数据
	 */
	data: {
		// classes: [
		// 	{
		// 		category: "编程",
		// 		lecture: "授课方式",
		// 		title: "嘀嗒杯科学初级课程",
		// 		bundary: "6-12岁",
		// 		image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/someclassdemo.png",
		// 		price: 134
		// 	},
		// 	{
		// 		category: "编程",
		// 		lecture: "授课方式",
		// 		title: "嘀嗒杯科学中级课程",
		// 		bundary: "6-12岁",
		// 		image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/someclassdemo.png",
		// 		price: 154
		// 	},
		// 	{
		// 		category: "编程",
		// 		lecture: "授课方式",
		// 		title: "嘀嗒杯科学高级课程",
		// 		bundary: "6-12岁",
		// 		image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/someclassdemo.png",
		// 		price: 184
		// 	},
		// 	{
		// 		category: "编程",
		// 		lecture: "授课方式",
		// 		title: "嘀嗒杯科学高级课程",
		// 		bundary: "6-12岁",
		// 		image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/someclassdemo.png",
		// 		price: 184
		// 	},
		// ] 
		exps: null,
		name: "张呆呆"
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this
		let callback = {
			onSuccess: function(res) {
				that.setData({
					exps: res
				})
			},
			onFail: function() {
				// TODO : 报错 ...
			}
		}
		var bmexp = require('../../../models/bm_exp_schema.js')
		bmexp.queryMultiExps(callback)
		this.setData({
			exps: null,
			name: "张二呆"
		})
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
		console.log("111");
	},

	showClsDetail: function (event) {
		wx.navigateTo({
			url: '/pages/classes/detail/detail'
		})
	}
})
