// pages/class-lst/class-lst.js
var OSS = require('../../../models/ali-oss.js')
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
		let that = this;
		let callback = {
			onSuccess: function(res) {
        let _originRes = res;
        let newres = _originRes.map((ele) => {
          let _originImg = ele.SessionInfo.cover;
          ele.SessionInfo.dealCover = client.signatureUrl(_originImg);
            return ele
        })
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
