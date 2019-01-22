// component/classes/cla-banner/cla-banner.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		isList: {
			type: String,
			value: 'true',
		},
		exps:{
			type:"Array",
			value:[],
			observer:function(news,olds,path){
					let exp = [];
					if(news != null) {
							news.map((ele) => {
									if (ele.start_date != -1 && ele.end_date != -1) {
											exp.push(ele)
									}
							})
							this.setData({
									exp: exp
							})
					}  
			}
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		showClasses: function (event) {
			wx.navigateTo({
				url: '/pages/reservableitems/exps/lst/lst'
			})
		},
		showClsDetail: function (event) {
			let expid = event.currentTarget.dataset.expid;
			wx.navigateTo({
				url: '/pages/reservableitems/detail/detail?expid=' + expid
			})
		}
	}
})
